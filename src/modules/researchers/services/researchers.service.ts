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
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { caseTypeReport } from 'src/enums/caseType-report.enum';
import { SeverityClasification as SeverityClasificationEntity } from 'src/modules/severity-clasification/entities/severity-clasification.entity';
import { severityClasification } from 'src/enums/severity-clasif.enum';
import { Role as RoleEntity } from 'src/modules/role/entities/role.entity';
import { userRoles } from 'src/enums/user-roles.enum';
import { RoleResponseTime as RoleResponseTimeEntity } from 'src/modules/role-response-time/entities/role-response-time.entity';
import { sentinelTime } from 'src/enums/sentinel-time.enum';
import { UpdateResearcherDto } from '../dto/update-researcher.dto';
import { ReportAnalystAssignment as ReportAnalystAssignmentEntity } from 'src/modules/report-analyst-assignment/entities/report-analyst-assignment.entity';

@Injectable()
export class ResearchersService {
  constructor(
    @InjectRepository(ResearcherEntity)
    private readonly researcherRepository: Repository<ResearcherEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,
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
  ): Promise<ResearcherEntity> {
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

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.ASSIGNMENT_RESEARCHER,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(
        `El movimiento ${movementReport.ASSIGNMENT_RESEARCHER} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      createResearcherDto.res_validatedcase_id_fk,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id
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

    return assigned;
  }

  async summaryReportsMyAssignedCases(
    filingNumber?: string,
    patientDoc?: string,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ): Promise<CaseReportValidateEntity[]> {
    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.researcher', 'res')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportAnalystAssignment',
        'reportAnalystAssignment',
      )
      .where('crv.val_cr_validated = :validated', { validated: false });

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
  ): Promise<CaseReportValidateEntity[]> {
    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.researcher', 'res')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportAnalystAssignment',
        'reportAnalystAssignment',
      )
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

  async findOneAssignedResearch(id: number): Promise<ResearcherEntity> {
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
    updateResearcherDto: UpdateResearcherDto,
    clientIp: string,
    idAnalyst: number,
    idCaseReportValidate: string,
  ) {
    const findResearcherAssined = await this.researcherRepository.findOne({
      where: {
        res_validatedcase_id_fk: idCaseReportValidate,
        res_status: true,
        res_isreturned: false,
      },
    });

    if (!findResearcherAssined) {
      throw new HttpException(
        'No se encontró el reporte asignado a investigador.',
        HttpStatus.NO_CONTENT,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      idCaseReportValidate,
    );

    const findMovementReport = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.REASSIGNMENT_RESEARCHER,
        mov_r_status: true,
      },
    });

    if (!findMovementReport) {
      throw new HttpException(
        `El movimiento ${movementReport.REASSIGNMENT_RESEARCHER} no existe.`,
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

    if (findResearcherAssined) {
      const result = await this.researcherRepository.update(
        findResearcherAssined.id,
        {
          ...updateResearcherDto,
          res_useranalyst_id: idAnalyst,
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
      idAnalyst,
      clientIp,
      logReports.LOG_REASSIGNMENT_RESEARCHER,
    );

    return new HttpException(
      `Investigador reasignado correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async returnCaseToAnalyst(
    idCaseReportValidate: string,
    clientIp: string,
    idResearcher: number,
  ) {
    const findReportResearcherAssigned = await this.researcherRepository.findOne(
      {
        where: {
          res_validatedcase_id_fk: idCaseReportValidate,
          res_status: true,
          res_isreturned: false,
        },
      },
    );

    if (!findReportResearcherAssigned) {
      throw new HttpException(
        'No se encontró el reporte asignado a investigador.',
        HttpStatus.NO_CONTENT,
      );
    }

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

    const findMovementReport = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.RETURN_CASE_ANALYST,
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
      idResearcher,
      clientIp,
      logReports.LOG_RETURN_CASE_ANALYST,
    );

    return new HttpException(
      `¡Reporte devuelto a analista correctamente!`,
      HttpStatus.ACCEPTED,
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

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
