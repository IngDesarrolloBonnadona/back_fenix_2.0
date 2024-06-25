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
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/enums/logs.enum';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { PositionService } from 'src/modules/position/services/position.service';
import { HttpPositionService } from 'src/modules/position/http/http-position.service';
import { MovementReport as MovementReportEntity } from 'src/modules/movement-report/entities/movement-report.entity';
import { movementReport } from 'src/enums/movement-report.enum';
import { CaseReportValidate as CaseReportValidateEntity } from 'src/modules/case-report-validate/entities/case-report-validate.entity';

@Injectable()
export class ReportAnalystAssignmentService {
  constructor(
    @InjectRepository(ReportAnalystAssignmentEntity)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignmentEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>,

    private readonly logService: LogService,
    private readonly positionService: PositionService,
    private readonly httpPositionService: HttpPositionService,
    @Inject(forwardRef(() => CaseReportValidateService))
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  async findInfoAnalystByCode(code?: number) {
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

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.ASSIGNMENT_ANALYST,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(
        `El movimiento ${movementReport.ASSIGNMENT_ANALYST} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const analyst = this.reportAnalystAssignmentRepository.create({
      ...createReportAnalystAssignmentDto,
      ass_ra_uservalidator_id: idValidator,
    });

    const assigned = await this.reportAnalystAssignmentRepository.save(analyst);

    await this.logService.createLog(
      assigned.ass_ra_validatedcase_id_fk,
      idValidator,
      clientIp,
      logReports.LOG_ASSIGNMENT_ANALYST,
    );

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      assigned.ass_ra_validatedcase_id_fk,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return assigned;
  }

  async reAssingAnalyst(
    updateReportAnalystAssignmentDto: UpdateReportAnalystAssignmentDto,
    clientIp: string,
    idValidator: number,
    idCaseReportValidate: string,
  ) {
    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ass_ra_validatedcase_id_fk: idCaseReportValidate,
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
      idCaseReportValidate,
    );

    await this.positionService.findOnePosition(
      updateReportAnalystAssignmentDto.ass_ra_position_id_fk,
    );

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.REASSIGNMENT_ANALYST,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(
        `El movimiento ${movementReport.REASSIGNMENT_ANALYST} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      idCaseReportValidate,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

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
      idCaseReportValidate,
      idValidator,
      clientIp,
      logReports.LOG_REASSIGNMENT_ANALYST,
    );

    return new HttpException(
      `¡Analista reasignado correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async summaryReportsForAssignCases(
    filingNumber?: string,
    statusMovementId?: number,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ): Promise<CaseReportValidateEntity[]> {
    const where: FindOptionsWhere<CaseReportValidateEntity> = {};

    if (filingNumber) {
      where.val_cr_filingnumber = Like(`%${filingNumber}%`);
    }

    if (statusMovementId) {
      where.val_cr_statusmovement_id_fk = statusMovementId;
    }

    if (caseTypeId) {
      where.val_cr_casetype_id_fk = caseTypeId;
    }

    if (eventId) {
      where.val_cr_event_id_fk = eventId;
    }

    if (priorityId) {
      where.val_cr_priority_id_fk = priorityId;
    }

    where.val_cr_validated = false;

    const caseReportsValidate = await this.caseReportValidateRepository.find({
      where,
      relations: {
        movementReport: true,
        caseType: true,
        event: true,
        priority: true,
        researcher: true,
        reportAnalystAssignment: true,
      },
    });

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportsValidate;
  }

  async summaryOfMyAssignedCases(
    filingNumber?: string,
    patientDoc?: string,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ): Promise<CaseReportValidateEntity[]> {
    const where: FindOptionsWhere<CaseReportValidateEntity> = {};

    if (filingNumber) {
      where.val_cr_filingnumber = Like(`%${filingNumber}%`);
    }

    if (patientDoc) {
      where.val_cr_documentpatient = Like(`%${patientDoc}%`);
    }

    if (caseTypeId) {
      where.val_cr_casetype_id_fk = caseTypeId;
    }

    if (eventId) {
      where.val_cr_event_id_fk = eventId;
    }

    if (priorityId) {
      where.val_cr_priority_id_fk = priorityId;
    }

    where.val_cr_validated = false;

    const caseReportsValidate = await this.caseReportValidateRepository.find({
      where,
      relations: {
        caseType: true,
        event: true,
        priority: true,
        researcher: true,
        reportAnalystAssignment: true,
      },
    });

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportsValidate;
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

  async findOneAssignedAnalyst(
    id: number,
  ): Promise<ReportAnalystAssignmentEntity> {
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

    const analystAssignedFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ass_ra_useranalyst_id:
            createReportAnalystAssignmentDto.ass_ra_useranalyst_id,
          ass_ra_validatedcase_id_fk:
            createReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
          ass_ra_position_id_fk:
            createReportAnalystAssignmentDto.ass_ra_position_id_fk,
        },
      });

    if (analystAssignedFind) {
      throw new HttpException(
        'El analista ya se encuentra asignado con ese reporte.',
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

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.RETURN_CASE_ANALYST,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(
        `El movimiento ${movementReport.RETURN_CASE_ANALYST} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const analyst = this.reportAnalystAssignmentRepository.create({
      ...createReportAnalystAssignmentDto,
      ass_ra_uservalidator_id: reportAssignmentFind.ass_ra_uservalidator_id,
    });

    const assigned = await this.reportAnalystAssignmentRepository.save(analyst);

    await this.logService.createLog(
      assigned.ass_ra_validatedcase_id_fk,
      idAnalyst,
      clientIp,
      logReports.LOG_RETURN_CASE_ANALYST,
    );

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      assigned.ass_ra_validatedcase_id_fk,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

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
