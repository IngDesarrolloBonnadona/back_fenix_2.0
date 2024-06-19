import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { FilterResearcherDto } from '../dto/filter-researcher.dto';
import { HttpResearchersService } from '../http/http-researchers.service';
import { CreateResearcherDto } from '../dto/create-researcher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Researcher as ResearcherEntity } from '../entities/researchers.entity';
import { Repository } from 'typeorm';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/enums/logs.enum';
import { MovementReport as MovementReportEntity } from 'src/modules/movement-report/entities/movement-report.entity';
import { movementReport } from 'src/enums/movement-report.enum';
import { CaseReportValidate as CaseReportValidateEntity } from 'src/modules/case-report-validate/entities/case-report-validate.entity';

@Injectable()
export class ResearchersService {
  constructor(
    @InjectRepository(ResearcherEntity)
    private readonly researcherRepository: Repository<ResearcherEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>,

    private readonly httpResearchersService: HttpResearchersService,
    private readonly logService: LogService,
    @Inject(forwardRef(() => CaseReportValidateService))
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  async filterResearchers(resFilter: Partial<FilterResearcherDto>) {
    const result = await this.httpResearchersService.getResearchersData();
    const researchers: FilterResearcherDto[] = result.data.data;

    const filteredResearchers = researchers.filter((research) => {
      return (
        (!resFilter.empImmediateBoss ||
          research.empImmediateBoss === resFilter.empImmediateBoss) &&
        (!resFilter.empPosition ||
          research.empPosition === resFilter.empPosition)
      );
    });

    if (filteredResearchers.length === 0) {
      throw new HttpException(
        'No se encontraron investigadores que coincidan con los criterios de búsqueda.',
        HttpStatus.NO_CONTENT,
      );
    }

    return filteredResearchers;
  }

  async assingResearcher(
    createResearcherDto: CreateResearcherDto,
    clientIp: string,
    idAnalyst: number,
  ) {
    const reportAssignmentFind = await this.researcherRepository.findOne({
      where: {
        res_validatedcase_id_fk: createResearcherDto.res_validatedcase_id_fk,
        res_status: true,
      },
    });

    if (reportAssignmentFind) {
      throw new HttpException(
        'El reporte ya tiene un investigador asignado',
        HttpStatus.CONFLICT,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      createResearcherDto.res_validatedcase_id_fk,
    );

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.ASSIGNMENT_INVESTIGATOR,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(
        `El movimiento ${movementReport.ASSIGNMENT_INVESTIGATOR} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      createResearcherDto.res_validatedcase_id_fk,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
        val_cr_status: false,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      createResearcherDto.res_validatedcase_id_fk,
      idAnalyst,
      clientIp,
      logReports.LOG_ASSIGNMENT_INVESTIGATOR,
    );

    const research = this.researcherRepository.create({
      ...createResearcherDto,
      res_ra_useranalyst_id: idAnalyst,
    });

    const assigned = await this.researcherRepository.save(research);

    return assigned;
  }

  async findOneAssignedResearch(id: number) {
    const research = await this.researcherRepository.findOne({
      where: { id, res_status: true },
    });

    if (!research) {
      throw new HttpException(
        'No se encontró el investigador',
        HttpStatus.NO_CONTENT,
      );
    }
    return research;
  }

  async deleteAssignedResearcher(id: number) {
    const Researcher = await this.findOneAssignedResearch(id);
    const result = await this.researcherRepository.softDelete(Researcher.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el investigador`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
