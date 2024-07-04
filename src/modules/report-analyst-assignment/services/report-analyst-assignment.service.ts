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
import { RoleResponseTime as RoleResponseTimeEntity } from 'src/modules/role-response-time/entities/role-response-time.entity';
import { Role as RoleEntity } from 'src/modules/role/entities/role.entity';
import { userRoles } from 'src/enums/user-roles.enum';
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { caseTypeReport } from 'src/enums/caseType-report.enum';
import { SeverityClasification as SeverityClasificationEntity } from 'src/modules/severity-clasification/entities/severity-clasification.entity';
import { severityClasification } from 'src/enums/severity-clasif.enum';
import { sentinelTime } from '../../../enums/sentinel-time.enum';

@Injectable()
export class ReportAnalystAssignmentService {
  constructor(
    @InjectRepository(ReportAnalystAssignmentEntity)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignmentEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RoleResponseTimeEntity)
    private readonly roleResponseTimeRepository: Repository<RoleResponseTimeEntity>,
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository: Repository<CaseTypeEntity>,
    @InjectRepository(SeverityClasificationEntity)
    private readonly severityClasificationRepository: Repository<SeverityClasificationEntity>,

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
          ass_ra_isreturned: false,
        },
      });

    if (reportAssignmentFind) {
      throw new HttpException(
        'El reporte ya tiene un analista asignado',
        HttpStatus.CONFLICT,
      );
    }

    const caseValidateFound =
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

    const findIdRole = await this.roleRepository.findOne({
      where: {
        role_name: userRoles.ANALYST,
        role_status: true,
      },
    });

    if (!findIdRole) {
      throw new HttpException(
        `El rol ${userRoles.ANALYST} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const findRoleResponseTime = await this.roleResponseTimeRepository.findOne({
      where: {
        rest_r_role_id_fk: findIdRole.id,
        rest_r_severityclasif_id_fk:
          caseValidateFound.val_cr_severityclasif_id_fk,
        rest_r_status: true,
      },
    });

    if (!findRoleResponseTime) {
      throw new HttpException(
        `El tiempo de respuesta del rol ${userRoles.ANALYST} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const findCaseType = await this.caseTypeRepository.findOne({
      where: {
        cas_t_name: caseTypeReport.ADVERSE_EVENT,
        cas_t_status: true,
      },
    });

    if (!findCaseType) {
      throw new HttpException(
        `El tipo de caso ${caseTypeReport.ADVERSE_EVENT} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const findSeverityClasification =
      await this.severityClasificationRepository.findOne({
        where: {
          sev_c_name: severityClasification.SERIOUS_SEVERITY,
        },
      });

    if (!findSeverityClasification) {
      throw new HttpException(
        `La clasificacion de severidad ${severityClasification.SERIOUS_SEVERITY} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    let responseTime = findRoleResponseTime.rest_r_responsetime;

    if (
      findCaseType.id === caseValidateFound.val_cr_casetype_id_fk &&
      findSeverityClasification.id ===
        caseValidateFound.val_cr_severityclasif_id_fk
    ) {
      responseTime = sentinelTime.SENTINEL_TIME;
    }

    const analyst = this.reportAnalystAssignmentRepository.create({
      ...createReportAnalystAssignmentDto,
      ass_ra_uservalidator_id: idValidator,
      ass_ra_days: responseTime,
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

    return new HttpException(
      `¡El analista se asignó correctamente!`,
      HttpStatus.CREATED,
    );
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
          ass_ra_isreturned: false,
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

    const findMovementReport = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.REASSIGNMENT_ANALYST,
        mov_r_status: true,
      },
    });

    if (!findMovementReport) {
      throw new HttpException(
        `El movimiento ${movementReport.REASSIGNMENT_ANALYST} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      idCaseReportValidate,
      {
        val_cr_statusmovement_id_fk: findMovementReport.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      idCaseReportValidate,
      idValidator,
      clientIp,
      logReports.LOG_REASSIGNMENT_ANALYST,
    );

    return new HttpException(
      `¡Analista reasignado correctamente!`,
      HttpStatus.OK,
    );
  }

  async returnCaseBetweenAnalyst(
    createReportAnalystAssignmentDto: ReportAnalystAssignmentDto,
    clientIp: string,
    idAnalystCurrent: number,
  ) {
    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ass_ra_validatedcase_id_fk:
            createReportAnalystAssignmentDto.ass_ra_validatedcase_id_fk,
          ass_ra_status: true,
          ass_ra_isreturned: false,
        },
      });

    if (!reportAssignmentFind) {
      throw new HttpException(
        'No se encontró el caso asignado',
        HttpStatus.NO_CONTENT,
      );
    }

    if (reportAssignmentFind.ass_ra_amountreturns === 2) {
      throw new HttpException(
        'No se pueden hacer más devoluciones para este caso.',
        HttpStatus.CONFLICT,
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
          ass_ra_status: true,
          ass_ra_isreturned: false,
        },
      });

    if (analystAssignedFind) {
      throw new HttpException(
        'El analista que intentas devolver el caso ya se encuentra asignado con ese reporte.',
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
      ass_ra_days: reportAssignmentFind.ass_ra_days,
      ass_ra_amountreturns: (reportAssignmentFind.ass_ra_amountreturns += 1),
    });

    const assigned = await this.reportAnalystAssignmentRepository.save(analyst);

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

    await this.logService.createLog(
      assigned.ass_ra_validatedcase_id_fk,
      idAnalystCurrent,
      clientIp,
      logReports.LOG_RETURN_CASE_ANALYST,
    );

    return new HttpException(
      `EL analista fue reasignado correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async summaryReportsForAssignCases(
    filingNumber?: string,
    statusMovementId?: number,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ): Promise<CaseReportValidateEntity[]> {
    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.reportAnalystAssignment', 'raa')
      .leftJoinAndSelect('crv.movementReport', 'movementReport')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect('crv.researcher', 'researcher')
      .where('crv.val_cr_validated = :validated', { validated: false });

    if (filingNumber) {
      query.andWhere('crv.val_cr_filingnumber LIKE :filingNumber', {
        filingNumber: `%${filingNumber}%`,
      });
    }

    if (statusMovementId) {
      query.andWhere('crv.val_cr_statusmovement_id_fk = :statusMovementId', {
        statusMovementId,
      });
    }

    if (caseTypeId) {
      query.andWhere('crv.val_cr_casetype_id_fk = :caseTypeId', { caseTypeId });
    }

    if (eventId) {
      query.andWhere('crv.val_cr_event_id_fk = :eventId', { eventId });
    }

    if (priorityId) {
      query.andWhere('crv.val_cr_priority_id_fk = :priorityId', { priorityId });
    }

    query.andWhere('raa.ass_ra_status = :statusBool', {
      statusBool: true,
    });

    query.andWhere('raa.ass_ra_isreturned = :isReturnedBool', {
      isReturnedBool: false,
    });

    const caseReportsValidate = await query
      .orderBy('raa.createdAt', 'DESC')
      .getMany();

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
    where.ass_ra_isreturned = false;

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
        where: { id, ass_ra_status: true, ass_ra_isreturned: false },
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

  async returnCaseToValidator(
    idCaseReportValidate: string,
    clientIp: string,
    idAnalyst: number,
  ) {
    const findReportAnalystAssigned =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ass_ra_validatedcase_id_fk: idCaseReportValidate,
          ass_ra_status: true,
          ass_ra_isreturned: false,
        },
      });

    if (!findReportAnalystAssigned) {
      throw new HttpException(
        'No se encontró el reporte asignado a analista.',
        HttpStatus.NO_CONTENT,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      idCaseReportValidate,
    );

    const updateStatusReturn =
      await this.reportAnalystAssignmentRepository.update(
        findReportAnalystAssigned.id,
        {
          ass_ra_status: false,
          ass_ra_isreturned: true,
        },
      );

    if (updateStatusReturn.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el estado.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const findMovementReport = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.RETURN_CASE_VALIDATOR,
        mov_r_status: true,
      },
    });

    if (!findMovementReport) {
      throw new HttpException(
        `El movimiento ${movementReport.RETURN_CASE_VALIDATOR} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      idCaseReportValidate,
      {
        val_cr_statusmovement_id_fk: findMovementReport.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      idCaseReportValidate,
      idAnalyst,
      clientIp,
      logReports.LOG_RETURN_CASE_VALIDATOR,
    );

    return new HttpException(
      `¡Reporte devuelto a validador correctamente!`,
      HttpStatus.OK,
    );
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

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
