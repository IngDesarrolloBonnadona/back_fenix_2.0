import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ReportAnalystAssignmentDto } from '../dto/analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportAnalystAssignment as ReportAnalystAssignmentEntity } from '../entities/report-analyst-assignment.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/enums/logs.enum';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { PositionService } from 'src/modules/position/services/position.service';
import { HttpPositionService } from 'src/modules/position/http/http-position.service';

@Injectable()
export class ReportAnalystAssignmentService {
  constructor(
    @InjectRepository(ReportAnalystAssignmentEntity)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignmentEntity>,

    private readonly logService: LogService,
    private readonly positionService: PositionService,
    private readonly httpPositionService: HttpPositionService,
    @Inject(forwardRef(() => CaseReportValidateService))
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  async findOneAnalyst(code?: number) {
    const externalData = await this.httpPositionService.getPositionData(code);
    const analyst = externalData.data.data;

    if (!Array.isArray(analyst)) {
      throw new HttpException(
        'La estructura de los datos externos no es la esperada.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (analyst.length === 0) {
      throw new HttpException(
        'No se encontraron datos de analistas',
        HttpStatus.NO_CONTENT,
      );
    }

    return analyst;
  }

  async assingAnalyst(
    createReportAnalystAssignmentDto: ReportAnalystAssignmentDto,
    clientIp: string,
    idValidator: number,
  ) {
    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ass_ra_validatedcase_id_fk:
            createReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
          ass_ra_status: true,
        },
      });

    if (reportAssignmentFind) {
      throw new HttpException(
        'El reporte ya tiene un analista asignado',
        HttpStatus.CONFLICT,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      createReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
    );

    await this.positionService.findOnePosition(
      createReportAnalystAssignmentDto.ass_ra_position_id_fk,
    );

    await this.logService.createLog(
      createReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
      idValidator,
      clientIp,
      logReports.LOG_ASSIGNMENT_ANALYST,
    );

    const analyst = this.reportAnalystAssignmentRepository.create({
      ...createReportAnalystAssignmentDto,
      ass_ra_uservalidator_id: idValidator,
    });

    const assigned = await this.reportAnalystAssignmentRepository.save(analyst);

    return assigned;
  }

  async reAssingAnalyst(
    updateReportAnalystAssignmentDto: UpdateReportAnalystAssignmentDto,
    clientIp: string,
    idValidator: number,
  ) {
    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ass_ra_validatedcase_id_fk:
            updateReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
          ass_ra_status: true,
        },
      });

    if (!reportAssignmentFind) {
      throw new HttpException(
        'No se encontró el reporte asignado a analista',
        HttpStatus.NO_CONTENT,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      updateReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
    );

    await this.positionService.findOnePosition(
      updateReportAnalystAssignmentDto.ass_ra_position_id_fk,
    );

    if (reportAssignmentFind) {
      const result = await this.reportAnalystAssignmentRepository.update(
        reportAssignmentFind.id,
        {
          ...updateReportAnalystAssignmentDto,
          ass_ra_uservalidator_id: idValidator,
        },
      );

      if (result.affected === 0) {
        return new HttpException(
          `No se pudo reasignar el analista`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    await this.logService.createLog(
      updateReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
      idValidator,
      clientIp,
      logReports.LOG_REASSIGNMENT_ANALYST,
    );

    return new HttpException(
      `¡Analista reasignado correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async findAssignedAnalystsByPosition(
    positionId?: number,
  ): Promise<ReportAnalystAssignmentEntity[]> {
    const where: FindOptionsWhere<ReportAnalystAssignmentEntity> = {};

    if (positionId) {
      where.ass_ra_position_id_fk = positionId;
    }

    where.ass_ra_status = true;

    const analystReporters = await this.reportAnalystAssignmentRepository.find({
      where,
      relations: {
        caseReportValidate: true,
        position: true,
      },
    });

    if (analystReporters.length === 0) {
      throw new HttpException(
        '¡No hay reportes asignados para mostrar.!',
        HttpStatus.NO_CONTENT,
      );
    }

    return analystReporters;
  }

  async findOneAssignedAnalyst(id: number) {
    const analystReporter =
      await this.reportAnalystAssignmentRepository.findOne({
        where: { id, ass_ra_status: true },
        relations: {
          caseReportValidate: true,
          position: true,
        },
      });

    if (!analystReporter) {
      throw new HttpException(
        'No se encontró el analista',
        HttpStatus.NO_CONTENT,
      );
    }
    return analystReporter;
  }

  async returnCaseBetweenAnalyst(
    createReportAnalystAssignmentDto: ReportAnalystAssignmentDto,
    clientIp: string,
    idAnalyst: number,
  ): Promise<ReportAnalystAssignmentEntity> {
    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ass_ra_validatedcase_id_fk:
            createReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
          ass_ra_status: true,
        },
      });

    if (!reportAssignmentFind) {
      throw new HttpException(
        'No se encontró el reporte asignado a analista',
        HttpStatus.NO_CONTENT,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      createReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
    );

    await this.positionService.findOnePosition(
      createReportAnalystAssignmentDto.ass_ra_position_id_fk,
    );

    reportAssignmentFind.ass_ra_status = false;
    await this.reportAnalystAssignmentRepository.save(reportAssignmentFind);

    await this.logService.createLog(
      createReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
      idAnalyst,
      clientIp,
      logReports.LOG_REASSIGNMENT_ANALYST,
    );

    const analyst = this.reportAnalystAssignmentRepository.create(
      createReportAnalystAssignmentDto,
    );

    const assigned = await this.reportAnalystAssignmentRepository.save(analyst);

    return assigned;
  }

  async deleteAssignedAnalyst(id: number) {
    const analystReporter = await this.findOneAssignedAnalyst(id);
    const result = await this.reportAnalystAssignmentRepository.softDelete(
      analystReporter.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el analista`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
