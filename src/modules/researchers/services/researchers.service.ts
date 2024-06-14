import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { FilterResearcherDto } from '../dto/filter-researcher.dto';
import { HttpResearchersService } from '../http/http-researchers.service';
import { CreateResearcherDto } from '../dto/create-researcher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Researcher as ResearcherEntity } from '../entities/researchers.entity';
import { Repository } from 'typeorm';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/enums/logs.enum';

@Injectable()
export class ResearchersService {
  constructor(
    @InjectRepository(ResearcherEntity)
    private readonly researcherRepository: Repository<ResearcherEntity>,

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
        HttpStatus.NOT_FOUND,
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

    await this.logService.createLog(
      createResearcherDto.res_validatedcase_id_fk,
      idAnalyst,
      clientIp,
      logReports.LOG_ASSIGNMENT_INVESTIGATOR,
    );

    const research = this.researcherRepository.create({
      ...createResearcherDto,
      ass_ra_useranalyst_id: idAnalyst
    });

    const assigned = await this.researcherRepository.save(research);

    return assigned;
  }

  async findOneAssignedResearch(id: number) {
    const research =
      await this.researcherRepository.findOne({
        where: { id, res_status: true },
      });

    if (!research) {
      throw new HttpException(
        'No se encontró el investigador',
        HttpStatus.NOT_FOUND,
      );
    }
    return research;
  }

  async deleteAssignedResearcher(id: number) {
    const Researcher = await this.findOneAssignedResearch(id);
    const result = await this.researcherRepository.softDelete(
      Researcher.id,
    );

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
