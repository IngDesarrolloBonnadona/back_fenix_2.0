import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateReportAnalystAssignmentDto } from '../dto/create-report-analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportAnalystAssignment as ReportAnalystAssignmentEntity } from '../entities/report-analyst-assignment.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/utils/enums/logs.enum';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { PositionService } from 'src/modules/position/services/position.service';
import { HttpPositionService } from 'src/modules/position/http/http-position.service';
import { movementReport } from 'src/utils/enums/movement-report.enum';
import { CaseReportValidate as CaseReportValidateEntity } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { RoleResponseTime as RoleResponseTimeEntity } from 'src/modules/role-response-time/entities/role-response-time.entity';
import { RolePermission as RoleEntity } from 'src/modules/role-permission/entities/role-permission.entity';
import { userRoles } from 'src/utils/enums/user-roles.enum';
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { caseTypeReport } from 'src/utils/enums/caseType-report.enum';
import { SeverityClasification as SeverityClasificationEntity } from 'src/modules/severity-clasification/entities/severity-clasification.entity';
import { severityClasification } from 'src/utils/enums/severity-clasif.enum';
import { sentinelTime } from '../../../utils/enums/sentinel-time.enum';
import { QueryReportAnalystAssignmentDto } from '../dto/query-report-analyst-assignment.dto';
import { MovementReportService } from 'src/modules/movement-report/services/movement-report.service';
import { ReportResearcherAssignment as ReportResearcherAssignmentEntity } from 'src/modules/report-researchers-assignment/entities/report-researchers-assignment.entity';
import { MovementReport as MovementReportEntity } from 'src/modules/movement-report/entities/movement-report.entity';

@Injectable()
export class ReportAnalystAssignmentService {
  constructor(
    @InjectRepository(ReportAnalystAssignmentEntity)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignmentEntity>,
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
    @InjectRepository(ReportResearcherAssignmentEntity)
    private readonly reportResearcherAssignmentRepository: Repository<ReportResearcherAssignmentEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,

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
        HttpStatus.NOT_FOUND,
      );
    }

    return analyst;
  }

  async assingAnalyst(
    createReportAnalystAssignmentDto: CreateReportAnalystAssignmentDto,
    clientIp: string,
    idValidator: string,
  ) {
    if (
      !createReportAnalystAssignmentDto ||
      !createReportAnalystAssignmentDto.ana_useranalyst_id ||
      !createReportAnalystAssignmentDto.ana_validatedcase_id_fk ||
      !createReportAnalystAssignmentDto.ana_position_id_fk
    ) {
      throw new HttpException(
        'Algunos datos para asignar analistas son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idValidator) {
      throw new HttpException(
        'El identificador del validador es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk:
            createReportAnalystAssignmentDto.ana_validatedcase_id_fk,
          ana_status: true,
          ana_isreturned: false,
        },
      });

    if (reportAssignmentFind) {
      throw new HttpException(
        'El reporte ya tiene un analista asignado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const caseValidateFound =
      await this.caseReportValidateService.findOneReportValidate(
        createReportAnalystAssignmentDto.ana_validatedcase_id_fk,
      );

    await this.positionService.findOnePosition(
      createReportAnalystAssignmentDto.ana_position_id_fk,
    );

    // const movementReportFound =
    //   await this.movementReportService.findOneMovementReportByName(
    //     movementReport.ASSIGNMENT_ANALYST,
    //   );

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.ASSIGNMENT_ANALYST,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      return new HttpException(
        `El movimiento no existe.`,
        HttpStatus.NOT_FOUND,
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
        HttpStatus.NOT_FOUND,
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
        HttpStatus.NOT_FOUND,
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
        HttpStatus.NOT_FOUND,
      );
    }

    const findSeverityClasification =
      await this.severityClasificationRepository.findOne({
        where: {
          sev_c_name: severityClasification.SERIOUS_SEVERITY,
          sev_c_status: true,
        },
      });

    if (!findSeverityClasification) {
      throw new HttpException(
        `La clasificacion de severidad ${severityClasification.SERIOUS_SEVERITY} no existe.`,
        HttpStatus.NOT_FOUND,
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
      ana_uservalidator_id: idValidator,
      ana_days: responseTime,
    });

    const assigned = await this.reportAnalystAssignmentRepository.save(analyst);

    await this.logService.createLog(
      assigned.ana_validatedcase_id_fk,
      idValidator,
      clientIp,
      logReports.LOG_ASSIGNMENT_ANALYST,
    );

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      assigned.ana_validatedcase_id_fk,
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
    idValidator: string,
    idCaseReportValidate: string,
  ) {
    if (!updateReportAnalystAssignmentDto) {
      throw new HttpException(
        'Los datos para actualizar la asignación del analista son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idValidator) {
      throw new HttpException(
        'El identificador del validador es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idCaseReportValidate) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk: idCaseReportValidate,
          ana_status: true,
          // ana_isreturned: false,
        },
        withDeleted: true,
      });

    if (!reportAssignmentFind) {
      throw new HttpException(
        'No se encontró el reporte asignado a analista',
        HttpStatus.NOT_FOUND,
      );
    }

    const caseReportValidate = await this.caseReportValidateRepository.findOne({
      where: {
        id: idCaseReportValidate,
        val_cr_validated: false,
        val_cr_status: true,
      },
      withDeleted: true,
    });

    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.positionService.findOnePosition(
      updateReportAnalystAssignmentDto.ana_position_id_fk,
    );

    const result = await this.reportAnalystAssignmentRepository.update(
      reportAssignmentFind.id,
      {
        ...updateReportAnalystAssignmentDto,
        ana_uservalidator_id: idValidator,
        ana_amountreturns: 0,
        deletedAt: null,
        ana_isreturned: false,
      },
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo reasignar el analista`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // const movementReportFound =
    //   await this.movementReportService.findOneMovementReportByName(
    //     movementReport.REASSIGNMENT_ANALYST,
    //   );

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.REASSIGNMENT_ANALYST,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      return new HttpException(
        `El movimiento no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      caseReportValidate.id,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
        val_cr_status: true,
        deletedAt: null,
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
    createReportAnalystAssignmentDto: CreateReportAnalystAssignmentDto,
    clientIp: string,
    idAnalystCurrent: string,
  ) {
    if (
      !createReportAnalystAssignmentDto ||
      !createReportAnalystAssignmentDto.ana_useranalyst_id ||
      !createReportAnalystAssignmentDto.ana_validatedcase_id_fk ||
      !createReportAnalystAssignmentDto.ana_position_id_fk ||
      !createReportAnalystAssignmentDto.ana_justifications
    ) {
      throw new HttpException(
        'Algunos datos para asignar analistas son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idAnalystCurrent) {
      throw new HttpException(
        'El identificador del analista actual es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk:
            createReportAnalystAssignmentDto.ana_validatedcase_id_fk,
          ana_status: true,
          ana_isreturned: false,
        },
      });

    if (!reportAssignmentFind) {
      throw new HttpException(
        'No se encontró el caso asignado',
        HttpStatus.NOT_FOUND,
      );
    }

    if (reportAssignmentFind.ana_amountreturns === 2) {
      throw new HttpException(
        'No se pueden hacer más devoluciones para este caso.',
        HttpStatus.CONFLICT,
      );
    }

    const analystAssignedFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_useranalyst_id:
            createReportAnalystAssignmentDto.ana_useranalyst_id,
          ana_validatedcase_id_fk:
            createReportAnalystAssignmentDto.ana_validatedcase_id_fk,
          ana_position_id_fk:
            createReportAnalystAssignmentDto.ana_position_id_fk,
          ana_status: true,
          ana_isreturned: false,
        },
      });

    if (analystAssignedFind) {
      throw new HttpException(
        'El analista que intentas devolver el caso ya se encuentra asignado con ese reporte.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      createReportAnalystAssignmentDto.ana_validatedcase_id_fk,
    );

    await this.positionService.findOnePosition(
      createReportAnalystAssignmentDto.ana_position_id_fk,
    );

    reportAssignmentFind.ana_status = false;
    await this.reportAnalystAssignmentRepository.save(reportAssignmentFind);
    await this.reportAnalystAssignmentRepository.softDelete(
      reportAssignmentFind.id,
    );

    // const movementReportFound =
    //   await this.movementReportService.findOneMovementReportByName(
    //     movementReport.RETURN_CASE_ANALYST,
    //   );

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.RETURN_CASE_ANALYST,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      return new HttpException(
        `El movimiento no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const analyst = this.reportAnalystAssignmentRepository.create({
      ...createReportAnalystAssignmentDto,
      ana_uservalidator_id: reportAssignmentFind.ana_uservalidator_id,
      ana_days: reportAssignmentFind.ana_days,
      ana_amountreturns: (reportAssignmentFind.ana_amountreturns += 1),
    });

    const assigned = await this.reportAnalystAssignmentRepository.save(analyst);

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      assigned.ana_validatedcase_id_fk,
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
      assigned.ana_validatedcase_id_fk,
      idAnalystCurrent,
      clientIp,
      logReports.LOG_RETURN_CASE_ANALYST,
    );

    return new HttpException(
      `EL caso fue devuelto a otro analista correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async summaryReportsForAssignCases(
    filingNumber?: string,
    statusMovementId?: number,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ) {
    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.reportAnalystAssignment', 'raa')
      .leftJoinAndSelect('crv.movementReport', 'movementReport')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportResearcherAssignment',
        'reportResearcherAssignment',
      )
      .where('crv.val_cr_validated = :validated', { validated: false })
      .andWhere('crv.val_cr_status = :status', { status: true });

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

    query.andWhere('raa.ana_status = :statusBool', {
      statusBool: true,
    });

    query.andWhere('raa.ana_isreturned = :isReturnedBool', {
      isReturnedBool: false,
    });

    const caseReportsValidate = await query
      .orderBy('raa.createdAt', 'DESC')
      .getMany();

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async findAssignedAnalystsByPosition(query: QueryReportAnalystAssignmentDto) {
    const where: FindOptionsWhere<ReportAnalystAssignmentEntity> = {};

    if (query.positionId) {
      where.ana_position_id_fk = query.positionId;
    }

    where.ana_status = true;
    where.ana_isreturned = false;

    const analystReporters = await this.reportAnalystAssignmentRepository.find({
      where,
      relations: {
        caseReportValidate: true,
        position: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (analystReporters.length === 0) {
      throw new HttpException(
        '¡No hay reportes asignados para mostrar.!',
        HttpStatus.NOT_FOUND,
      );
    }

    return analystReporters;
  }

  async findOneAssignedAnalyst(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del analista asignado es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const analystReporter =
      await this.reportAnalystAssignmentRepository.findOne({
        where: { id, ana_status: true, ana_isreturned: false },
        relations: {
          caseReportValidate: true,
          position: true,
        },
      });

    if (!analystReporter) {
      throw new HttpException(
        'No se encontró el analista',
        HttpStatus.NOT_FOUND,
      );
    }
    return analystReporter;
  }

  async returnCaseToValidator(
    idCaseReportValidate: string,
    clientIp: string,
    idAnalyst: string,
  ) {
    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idAnalyst) {
      throw new HttpException(
        'El identificador del analista es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idCaseReportValidate) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findReportAnalystAssigned =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk: idCaseReportValidate,
          ana_status: true,
          ana_isreturned: false,
        },
      });

    if (!findReportAnalystAssigned) {
      throw new HttpException(
        'No se encontró el reporte asignado a analista.',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      idCaseReportValidate,
    );

    const updateStatusReturn =
      await this.reportAnalystAssignmentRepository.update(
        findReportAnalystAssigned.id,
        {
          ana_isreturned: true,
        },
      );

    if (updateStatusReturn.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el estado de retorno.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result = await this.reportAnalystAssignmentRepository.softDelete(
      findReportAnalystAssigned.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo anular el registro.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const findResearcherAssigned =
      await this.reportResearcherAssignmentRepository.findOne({
        where: {
          res_validatedcase_id_fk: idCaseReportValidate,
          res_status: true,
          res_isreturned: false,
        },
      });

    if (findResearcherAssigned) {
      const result = await this.reportResearcherAssignmentRepository.softDelete(
        findResearcherAssigned.id,
      );

      if (result.affected === 0) {
        return new HttpException(
          `No se pudo eliminar el investigador`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // const movementReportFound =
    //   await this.movementReportService.findOneMovementReportByName(
    //     movementReport.RETURN_CASE_VALIDATOR,
    //   );

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.RETURN_CASE_VALIDATOR,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      return new HttpException(
        `El movimiento no existe.`,
        HttpStatus.NOT_FOUND,
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
    const analystReporterFound =
      await this.reportAnalystAssignmentRepository.findOneBy({ id });

    if (!analystReporterFound) {
      return new HttpException(
        `Analista no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.reportAnalystAssignmentRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el analista asignado.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
