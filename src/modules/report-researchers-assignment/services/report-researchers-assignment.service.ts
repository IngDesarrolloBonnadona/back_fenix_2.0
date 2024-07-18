import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { FilterReportResearcherAssignmentDto } from '../dto/filter-researcher-.dto';
import { HttpResearchersService } from '../http/http-researchers.service';
import { CreateReportResearcherAssignmentDto } from '../dto/create-report-researcher-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportResearcherAssignment as ResearcherEntity } from '../entities/report-researchers-assignment.entity';
import { Repository } from 'typeorm';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/enums/logs.enum';
import { MovementReport as MovementReportEntity } from 'src/modules/movement-report/entities/movement-report.entity';
import { movementReport } from 'src/enums/movement-report.enum';
import { CaseReportValidate as CaseReportValidateEntity } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { caseTypeReport } from 'src/enums/caseType-report.enum';
import { SeverityClasification as SeverityClasificationEntity } from 'src/modules/severity-clasification/entities/severity-clasification.entity';
import { severityClasification } from 'src/enums/severity-clasif.enum';
import { RolePermission as RoleEntity } from 'src/modules/role-permission/entities/role-permission.entity';
import { userRoles } from 'src/enums/user-roles.enum';
import { RoleResponseTime as RoleResponseTimeEntity } from 'src/modules/role-response-time/entities/role-response-time.entity';
import { sentinelTime } from 'src/enums/sentinel-time.enum';
import { UpdateReportResearcherAssignmentDto } from '../dto/update-report-researcher-assignment.dto';
import { ReportAnalystAssignment as ReportAnalystAssignmentEntity } from 'src/modules/report-analyst-assignment/entities/report-analyst-assignment.entity';
import { MovementReportService } from 'src/modules/movement-report/services/movement-report.service';

@Injectable()
export class ResearchersService {
  constructor(
    @InjectRepository(ResearcherEntity)
    private readonly researcherRepository: Repository<ResearcherEntity>,
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>,
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository: Repository<CaseTypeEntity>,
    @InjectRepository(SeverityClasificationEntity)
    private readonly severityClasificationRepository: Repository<SeverityClasificationEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RoleResponseTimeEntity)
    private readonly roleResponseTimeRepository: Repository<RoleResponseTimeEntity>,
    @InjectRepository(ReportAnalystAssignmentEntity)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignmentEntity>,

    private readonly httpResearchersService: HttpResearchersService,
    private readonly logService: LogService,
    private readonly movementReportService: MovementReportService,
    @Inject(forwardRef(() => CaseReportValidateService))
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  async filterResearchers(
    resFilter: Partial<FilterReportResearcherAssignmentDto>,
  ) {
    const result = await this.httpResearchersService.getResearchersData();
    const researchers: FilterReportResearcherAssignmentDto[] = result.data.data;

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
    createResearcherDto: CreateReportResearcherAssignmentDto,
    clientIp: string,
    idAnalyst: number,
  ) {
    const reportAssignmentFind = await this.researcherRepository.findOne({
      where: {
        res_validatedcase_id_fk: createResearcherDto.res_validatedcase_id_fk,
        res_status: true,
        res_isreturned: false,
      },
    });

    if (reportAssignmentFind) {
      throw new HttpException(
        'El reporte ya tiene un investigador asignado',
        HttpStatus.CONFLICT,
      );
    }

    const findCaseValidate =
      await this.caseReportValidateService.findOneReportValidate(
        createResearcherDto.res_validatedcase_id_fk,
      );

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

    const findIdRole = await this.roleRepository.findOne({
      where: {
        role_name: userRoles.INVESTIGATOR,
        role_status: true,
      },
    });

    if (!findIdRole) {
      throw new HttpException(
        `El rol ${userRoles.INVESTIGATOR} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const findRoleResponseTime = await this.roleResponseTimeRepository.findOne({
      where: {
        rest_r_role_id_fk: findIdRole.id,
        rest_r_severityclasif_id_fk:
          findCaseValidate.val_cr_severityclasif_id_fk,
        rest_r_status: true,
      },
    });

    if (!findRoleResponseTime) {
      throw new HttpException(
        `El tiempo de respuesta del rol ${userRoles.INVESTIGATOR} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const movementReportFound =
      await this.movementReportService.findOneMovementReportByName(
        movementReport.ASSIGNMENT_RESEARCHER,
      );

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      createResearcherDto.res_validatedcase_id_fk,
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

    let responseTime = findRoleResponseTime.rest_r_responsetime;

    if (
      findCaseType.id === findCaseValidate.val_cr_casetype_id_fk &&
      findSeverityClasification.id ===
        findCaseValidate.val_cr_severityclasif_id_fk
    ) {
      responseTime = sentinelTime.SENTINEL_TIME;
    }

    const research = this.researcherRepository.create({
      ...createResearcherDto,
      res_useranalyst_id: idAnalyst,
      res_days: responseTime,
    });

    const assigned = await this.researcherRepository.save(research);

    await this.logService.createLog(
      assigned.res_validatedcase_id_fk,
      idAnalyst,
      clientIp,
      logReports.LOG_ASSIGNMENT_RESEARCHER,
    );

    return new HttpException(
      `¡El investigador se asignó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async summaryReportsMyAssignedCases(
    filingNumber?: string,
    patientDoc?: string,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ) {
    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.reportResearcherAssignment', 'res')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportAnalystAssignment',
        'reportAnalystAssignment',
      )
      .where('crv.val_cr_validated = :validated', { validated: false })
      .andWhere('crv.val_cr_status = :status', { status: true });

    if (filingNumber) {
      query.andWhere('crv.val_cr_filingnumber LIKE :filingNumber', {
        filingNumber: `%${filingNumber}%`,
      });
    }

    if (patientDoc) {
      query.andWhere('crv.val_cr_documentpatient LIKE :patientDoc', {
        patientDoc: `%${patientDoc}%`,
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

    query.andWhere('res.res_status = :statusBool', {
      statusBool: true,
    });

    query.andWhere('res.res_isreturned = :isReturnedBool', {
      isReturnedBool: false,
    });

    const caseReportsValidate = await query
      .orderBy('res.createdAt', 'DESC')
      .getMany();

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportsValidate;
  }

  async summaryReportsMyCasesByCharacterization(
    filingNumber?: string,
    statusMovementId?: number,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ) {
    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.reportResearcherAssignment', 'res')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportAnalystAssignment',
        'reportAnalystAssignment',
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

    query.andWhere('crv.val_cr_characterization_id_fk IS NOT NULL');

    query.andWhere('res.res_status = :statusBool', {
      statusBool: true,
    });

    query.andWhere('res.res_isreturned = :isReturnedBool', {
      isReturnedBool: false,
    });

    const caseReportsValidate = await query
      .orderBy('res.createdAt', 'DESC')
      .getMany();

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportsValidate;
  }

  async findOneAssignedResearch(id: number) {
    const research = await this.researcherRepository.findOne({
      where: { id, res_status: true, res_isreturned: false },
    });

    if (!research) {
      throw new HttpException(
        'No se encontró el investigador',
        HttpStatus.NO_CONTENT,
      );
    }
    return research;
  }

  async reAssingResearcher(
    updateResearcherDto: UpdateReportResearcherAssignmentDto,
    clientIp: string,
    idAnalyst: number,
    idCaseReportValidate: string,
  ) {
    const findResearcherAssigned = await this.researcherRepository.findOne({
      where: {
        res_validatedcase_id_fk: idCaseReportValidate,
      },
      // withDeleted: true,
    });

    if (!findResearcherAssigned) {
      throw new HttpException(
        'No se encontró el reporte asignado a investigador.',
        HttpStatus.NO_CONTENT,
      );
    }

    const caseReportValidate = await this.caseReportValidateRepository.findOne({
      where: {
        id: idCaseReportValidate,
        // val_cr_validated: false,
        // val_cr_status: true,
      },
      // withDeleted: true,
    });

    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte.',
        HttpStatus.NO_CONTENT,
      );
    }

    const movementReportFound =
      await this.movementReportService.findOneMovementReportByName(
        movementReport.REASSIGNMENT_RESEARCHER,
      );

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      caseReportValidate.id,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
        // val_cr_status: true,
        // deletedAt: null,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result = await this.researcherRepository.update(
      findResearcherAssigned.id,
      {
        ...updateResearcherDto,
        // res_useranalyst_id: idAnalyst,
        // res_status: true,
      },
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo reasignar el analista`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      idCaseReportValidate,
      idAnalyst,
      clientIp,
      logReports.LOG_REASSIGNMENT_RESEARCHER,
    );

    return new HttpException(
      `Investigador reasignado correctamente!`,
      HttpStatus.OK,
    );
  }

  async returnCaseToAnalyst(
    idCaseReportValidate: string,
    clientIp: string,
    idResearcher: number,
  ) {
    const findReportResearcherAssigned =
      await this.researcherRepository.findOne({
        where: {
          res_validatedcase_id_fk: idCaseReportValidate,
          res_status: true,
          res_isreturned: false,
        },
      });

    if (!findReportResearcherAssigned) {
      throw new HttpException(
        'No se encontró el reporte asignado a investigador.',
        HttpStatus.NO_CONTENT,
      );
    }

    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk: idCaseReportValidate,
          ana_status: true,
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

    const updateStatusReturn = await this.researcherRepository.update(
      findReportResearcherAssigned.id,
      {
        res_status: false,
        res_isreturned: true,
      },
    );

    if (updateStatusReturn.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el estado.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const movementReportFound =
      await this.movementReportService.findOneMovementReportByName(
        movementReport.RETURN_CASE_ANALYST,
      );

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
      idResearcher,
      clientIp,
      logReports.LOG_RETURN_CASE_ANALYST,
    );

    return new HttpException(
      `¡Reporte devuelto a analista correctamente!`,
      HttpStatus.OK,
    );
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

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
