import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UpdateCaseReportValidateDto } from '../dto/update-case-report-validate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseReportValidate as CaseReportValidateEntity } from '../entities/case-report-validate.entity';
import {
  Between,
  DataSource,
  FindOptionsWhere,
  In,
  Like,
  QueryRunner,
  Repository,
} from 'typeorm';
import { CreateCaseReportOriginalDto } from 'src/modules/case-report-original/dto/create-case-report-original.dto';
import { FindSimilarCaseReportValidateDto } from '../dto/find-similar-case-report-validate';
import { ValDtoValidator } from '../helper/val-dto-validator.helper';
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { MedicineService } from 'src/modules/medicine/services/medicine.service';
import { DeviceService } from 'src/modules/device/services/device.service';
import { MovementReport as MovementReportEntity } from 'src/modules/movement-report/entities/movement-report.entity';
import { movementReport } from 'src/enums/movement-report.enum';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/enums/logs.enum';
import { ReportAnalystAssignment as ReportAnalystAssignmentEntity } from 'src/modules/report-analyst-assignment/entities/report-analyst-assignment.entity';
import { ReportAnalystAssignmentService } from 'src/modules/report-analyst-assignment/services/report-analyst-assignment.service';
import { Synergy as SynergyEntity } from 'src/modules/synergy/entities/synergy.entity';
import { SynergyService } from 'src/modules/synergy/services/synergy.service';
import { Researcher as ResearcherEntity } from 'src/modules/researchers/entities/researchers.entity';
import { ResearchersService } from 'src/modules/researchers/services/researchers.service';
import { caseTypeReport } from 'src/enums/caseType-report.enum';
import { CreateValRiskReportDto } from '../dto/create-val-risk-report.dto';
import { CreateValAdverseEventReportDto } from '../dto/create-val-adverse-event-report.dto';
import { CreateValIncidentReportDto } from '../dto/create-val-incident-report.dto';
import { CreateValIndicatingUnsafeCareReportDto } from '../dto/create-val-indicating-unsafe-care-report.dto';
import { CreateValComplicationsReportDto } from '../dto/create-val-complications-report.dto';
import { CharacterizationCase as CharacterizationCaseEntity } from 'src/modules/characterization-cases/entities/characterization-case.entity';
import { CharacterizationCasesService } from 'src/modules/characterization-cases/services/characterization-cases.service';
import { RiskTypeService } from 'src/modules/risk-type/services/risk-type.service';
import { EventTypeService } from 'src/modules/event-type/services/event-type.service';
import { ServiceService } from 'src/modules/service/services/service.service';
import { EventService } from 'src/modules/event/services/event.service';
import { SeverityClasificationService } from 'src/modules/severity-clasification/services/severity-clasification.service';
import { OriginService } from 'src/modules/origin/services/origin.service';
import { SubOriginService } from 'src/modules/sub-origin/services/sub-origin.service';
import { RiskLevelService } from 'src/modules/risk-level/services/risk-level.service';
import { UnitService } from 'src/modules/unit/services/unit.service';
import { PriorityService } from 'src/modules/priority/services/priority.service';
import { Priority as PriorityEntity } from 'src/modules/priority/entities/priority.entity';

@Injectable()
export class CaseReportValidateService {
  constructor(
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>,
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository: Repository<CaseTypeEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,
    @InjectRepository(ReportAnalystAssignmentEntity)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignmentEntity>,
    @InjectRepository(SynergyEntity)
    private readonly synergyRepository: Repository<SynergyEntity>,
    @InjectRepository(ResearcherEntity)
    private readonly researchRepository: Repository<ResearcherEntity>,
    @InjectRepository(PriorityEntity)
    private readonly priorityRepository: Repository<PriorityEntity>,

    private dataSource: DataSource,
    private readonly medicineService: MedicineService,
    private readonly deviceService: DeviceService,
    private readonly logService: LogService,
    private readonly synergyService: SynergyService,
    private readonly characterizationCasesService: CharacterizationCasesService,
    private readonly riskTypeService: RiskTypeService,
    private readonly eventTypeService: EventTypeService,
    private readonly eventService: EventService,
    private readonly serviceService: ServiceService,
    private readonly severityClasificationService: SeverityClasificationService,
    private readonly originService: OriginService,
    private readonly subOriginService: SubOriginService,
    private readonly riskLevelService: RiskLevelService,
    private readonly unitService: UnitService,
    @Inject(forwardRef(() => ResearchersService))
    private readonly researchService: ResearchersService,
    @Inject(forwardRef(() => ReportAnalystAssignmentService))
    private readonly reportAnalystAssygnmentService: ReportAnalystAssignmentService,
  ) {}

  async findSimilarCaseReportsValidate(
    similarCaseReportValidate: FindSimilarCaseReportValidateDto,
  ) {
    const similarReport = await this.caseReportValidateRepository.find({
      where: {
        val_cr_casetype_id_fk: similarCaseReportValidate.val_cr_casetype_id_fk,
        val_cr_unit_id_fk: similarCaseReportValidate.val_cr_unit_id_fk,
        val_cr_documentpatient:
          similarCaseReportValidate.val_cr_documentpatient,
        val_cr_event_id_fk: similarCaseReportValidate.val_cr_event_id_fk,
        val_cr_eventtype_id_fk:
          similarCaseReportValidate.val_cr_eventtype_id_fk,
        val_cr_validated: false,
      },
    });

    if (similarReport.length > 0) {
      return {
        message: `¡Extisten ${similarReport.length} casos similares!`,
        data: similarReport,
      };
    } else {
      return { message: '¡No existen casos similares!' };
    }
  }

  async createReportValidate(
    createReportValDto: any,
    clientIp: string,
    reportId: string,
  ): Promise<any> {
    await ValDtoValidator(createReportValDto, this.caseTypeRepository);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all([
        this.characterizationCasesService.findOneCharacterization(
          createReportValDto.val_cr_characterization_id_fk,
        ),
        this.eventTypeService.findOneEventType(
          createReportValDto.val_cr_eventtype_id_fk,
        ),
        this.eventService.findOneEvent(createReportValDto.val_cr_event_id_fk),
        this.serviceService.findOneService(
          createReportValDto.val_cr_service_id_fk,
        ),
        this.originService.findOneOrigin(
          createReportValDto.val_cr_origin_id_fk,
        ),
        this.subOriginService.findOneSubOrigin(
          createReportValDto.val_cr_suborigin_id_fk,
        ),
        this.unitService.findOneUnit(createReportValDto.val_cr_unit_id_fk),
        createReportValDto.val_cr_risktype_id_fk &&
          this.riskTypeService.findOneRiskType(
            createReportValDto.ori_cr_risktype_id_fk,
          ),
        createReportValDto.val_cr_severityclasif_id_fk &&
          this.severityClasificationService.findOneSeverityClasification(
            createReportValDto.val_cr_severityclasif_id_fk,
          ),
        createReportValDto.val_cr_risklevel_id_fk &&
          this.riskLevelService.findOneRiskLevel(
            createReportValDto.val_cr_risklevel_id_fk,
          ),
      ]);

      const previousReport = await this.caseReportValidateRepository.findOne({
        where: {
          id: reportId,
          val_cr_validated: false,
        },
      });

      if (!previousReport) {
        throw new HttpException(
          `El reporte no existe o ya fue validado.`,
          HttpStatus.NO_CONTENT,
        );
      }

      if (previousReport) {
        previousReport.val_cr_validated = true;

        await queryRunner.manager.save(previousReport);
      }

      const caseTypeFound = await this.caseTypeRepository.findOne({
        where: {
          id: createReportValDto.val_cr_casetype_id_fk,
        },
      });

      let caseReportValidate: any;

      switch (caseTypeFound.cas_t_name) {
        case caseTypeReport.RISK:
          caseReportValidate = this.caseReportValidateRepository.create(
            createReportValDto as CreateValRiskReportDto,
          );
          console.log(`Se creó reporte validado ${caseTypeReport.RISK}`);
          break;
        case caseTypeReport.ADVERSE_EVENT:
          caseReportValidate = this.caseReportValidateRepository.create(
            createReportValDto as CreateValAdverseEventReportDto,
          );
          console.log(
            `Se creó reporte validado ${caseTypeReport.ADVERSE_EVENT}`,
          );
          break;
        case caseTypeReport.INCIDENT:
          caseReportValidate = this.caseReportValidateRepository.create(
            createReportValDto as CreateValIncidentReportDto,
          );
          console.log(`Se creó reporte validado ${caseTypeReport.INCIDENT}`);
          break;
        case caseTypeReport.INDICATING_UNSAFE_CARE:
          caseReportValidate = this.caseReportValidateRepository.create(
            createReportValDto as CreateValIndicatingUnsafeCareReportDto,
          );
          console.log(
            `Se creó reporte validado ${caseTypeReport.INDICATING_UNSAFE_CARE}`,
          );
          break;
        case caseTypeReport.COMPLICATIONS:
          caseReportValidate = this.caseReportValidateRepository.create(
            createReportValDto as CreateValComplicationsReportDto,
          );
          console.log(
            `Se creó reporte validado ${caseTypeReport.COMPLICATIONS}`,
          );
          break;
        // agregar un tipo de caso nuevo
        default:
          throw new HttpException(
            'Tipo de caso no reconocido.',
            HttpStatus.BAD_REQUEST,
          );
      }

      const consecutiveId = previousReport.val_cr_consecutive_id + 1;
      const previousId = previousReport.val_cr_previous_id + 1;

      const movementReportFound = await this.movementReportRepository.findOne({
        where: {
          mov_r_name: movementReport.VALIDATION,
          mov_r_status: true,
        },
      });

      if (!movementReportFound) {
        throw new HttpException(
          `El movimiento ${movementReport.VALIDATION} no existe.`,
          HttpStatus.NO_CONTENT,
        );
      }

      if (
        createReportValDto.val_cr_severityclasif_id_fk !== null &&
        createReportValDto.val_cr_severityclasif_id_fk !== undefined
      ) {
        const priorityFind = await this.priorityRepository.findOne({
          where: {
            prior_severityclasif_id_fk:
              createReportValDto.val_cr_severityclasif_id_fk,
            prior_status: true,
          },
        });

        if (!priorityFind) {
          throw new HttpException(
            `La prioridad no existe`,
            HttpStatus.NO_CONTENT,
          );
        }

        caseReportValidate.val_cr_priority_id_fk = priorityFind.id;
      }else {
        caseReportValidate.val_cr_priority_id_fk = null;
      }

      caseReportValidate.val_cr_filingnumber =
        previousReport.val_cr_filingnumber;
      caseReportValidate.val_cr_originalcase_id_fk =
        previousReport.val_cr_originalcase_id_fk;
      caseReportValidate.val_cr_consecutive_id = consecutiveId;
      caseReportValidate.val_cr_previous_id = previousId;
      caseReportValidate.val_cr_statusmovement_id_fk = movementReportFound.id;

      await queryRunner.manager.save(caseReportValidate);

      const hasMedicine =
        createReportValDto.medicines && createReportValDto.medicines.length > 0;

      if (hasMedicine) {
        await this.medicineService.createMedicineTransaction(
          createReportValDto.medicines,
          caseReportValidate.val_cr_originalcase_id_fk,
          queryRunner,
        );
      }

      const hasDevice =
        createReportValDto.devices && createReportValDto.devices.length > 0;

      if (hasDevice) {
        await this.deviceService.createDeviceTransation(
          createReportValDto.devices,
          caseReportValidate.val_cr_originalcase_id_fk,
          queryRunner,
        );
      }

      await this.logService.createLogTransaction(
        queryRunner,
        caseReportValidate.id,
        caseReportValidate.val_cr_reporter_id,
        clientIp,
        logReports.LOG_VALIDATION,
      );

      await queryRunner.commitTransaction();

      const reportData = {
        caseReportValidate,
        createdMedicine: createReportValDto.medicines,
        createdDevice: createReportValDto.devices,
      };

      return {
        message: `Reporte ${caseReportValidate.val_cr_filingnumber} se validó satisfactoriamente.`,
        data: reportData,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(
        `Un error a ocurrido: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async createReportValidateTransaction(
    queryRunner: QueryRunner,
    caseReportOriginal: CreateCaseReportOriginalDto,
    caseReportOriginalId: string,
  ): Promise<CaseReportValidateEntity> {
    const caseReportValidate = this.caseReportValidateRepository.create({
      val_cr_consecutive_id: 1,
      val_cr_previous_id: 0,
      val_cr_originalcase_id_fk: caseReportOriginalId,
      val_cr_filingnumber: caseReportOriginal.ori_cr_filingnumber,
      val_cr_casetype_id_fk: caseReportOriginal.ori_cr_casetype_id_fk,
      val_cr_documentpatient: caseReportOriginal.ori_cr_documentpatient,
      val_cr_doctypepatient: caseReportOriginal.ori_cr_doctypepatient,
      val_cr_firstnamepatient: caseReportOriginal.ori_cr_firstnamepatient,
      val_cr_secondnamepatient: caseReportOriginal.ori_cr_secondnamepatient,
      val_cr_firstlastnamepatient:
        caseReportOriginal.ori_cr_firstlastnamepatient,
      val_cr_secondlastnamepatient:
        caseReportOriginal.ori_cr_secondlastnamepatient,
      val_cr_agepatient: caseReportOriginal.ori_cr_agepatient,
      val_cr_genderpatient: caseReportOriginal.ori_cr_genderpatient,
      val_cr_epspatient: caseReportOriginal.ori_cr_epspatient,
      val_cr_admconsecutivepatient:
        caseReportOriginal.ori_cr_admconsecutivepatient,
      val_cr_reporter_id: caseReportOriginal.ori_cr_reporter_id,
      val_cr_eventtype_id_fk: caseReportOriginal.ori_cr_eventtype_id_fk,
      val_cr_service_id_fk: caseReportOriginal.ori_cr_service_id_fk,
      val_cr_event_id_fk: caseReportOriginal.ori_cr_event_id_fk,
      val_cr_risktype_id_fk: caseReportOriginal.ori_cr_risktype_id_fk,
      val_cr_severityclasif_id_fk:
        caseReportOriginal.ori_cr_severityclasif_id_fk,
      val_cr_origin_id_fk: caseReportOriginal.ori_cr_origin_id_fk,
      val_cr_suborigin_id_fk: caseReportOriginal.ori_cr_suborigin_id_fk,
      val_cr_risklevel_id_fk: caseReportOriginal.ori_cr_risklevel_id_fk,
      val_cr_unit_id_fk: caseReportOriginal.ori_cr_unit_id_fk,
      val_cr_priority_id_fk: caseReportOriginal.ori_cr_priority_id_fk,
      val_cr_statusmovement_id_fk:
        caseReportOriginal.ori_cr_statusmovement_id_fk,
      val_cr_description: caseReportOriginal.ori_cr_description,
      val_cr_inmediateaction: caseReportOriginal.ori_cr_inmediateaction,
      val_cr_materializedrisk: caseReportOriginal.ori_cr_materializedrisk,
      val_cr_associatedpatient: caseReportOriginal.ori_cr_associatedpatient,
    });
    return await queryRunner.manager.save(caseReportValidate);
  }

  async summaryReportsValidate(
    creationDate?: Date,
    filingNumber?: string,
    statusMovementId?: number,
    patientDoc?: string,
    caseTypeId?: number,
    eventTypeId?: number,
    priorityId?: number,
    unitId?: number,
    severityClasificationId?: number,
  ): Promise<CaseReportValidateEntity[]> {
    const where: FindOptionsWhere<CaseReportValidateEntity> = {};

    if (creationDate) {
      const nextDay = new Date(creationDate);
      nextDay.setDate(creationDate.getDate() + 1);

      where.createdAt = Between(creationDate, nextDay);
    }

    if (filingNumber) {
      where.val_cr_filingnumber = Like(`%${filingNumber}%`);
    }

    if (statusMovementId) {
      where.val_cr_statusmovement_id_fk = statusMovementId;
    }

    if (patientDoc) {
      where.val_cr_documentpatient = patientDoc;
    }

    if (caseTypeId) {
      where.val_cr_casetype_id_fk = caseTypeId;
    }

    if (unitId) {
      where.val_cr_unit_id_fk = unitId;
    }

    if (priorityId) {
      where.val_cr_priority_id_fk = priorityId;
    }

    if (severityClasificationId) {
      where.val_cr_severityclasif_id_fk = severityClasificationId;
    }

    if (eventTypeId) {
      where.val_cr_eventtype_id_fk = eventTypeId;
    }

    where.val_cr_validated = false;

    const caseReportsValidate = await this.caseReportValidateRepository.find({
      where,
      relations: {
        caseType: true,
        severityClasification: true,
        event: true,
        unit: true,
        priority: true,
        movementReport: true,
      },
      withDeleted: true,
    });

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportsValidate;
  }

  async summaryReportsForReview(
    filingNumber?: string,
    statusMovementId?: number,
    caseTypeId?: number,
    patientDoc?: string,
    priorityId?: number,
    creationDate?: Date,
  ): Promise<CaseReportValidateEntity[]> {
    const where: FindOptionsWhere<CaseReportValidateEntity> = {};

    if (creationDate) {
      const nextDay = new Date(creationDate);
      nextDay.setDate(creationDate.getDate() + 1);

      where.createdAt = Between(creationDate, nextDay);
    }

    if (filingNumber) {
      where.val_cr_filingnumber = Like(`%${filingNumber}%`);
    }

    if (patientDoc) {
      where.val_cr_documentpatient = patientDoc;
    }

    if (caseTypeId) {
      where.val_cr_casetype_id_fk = caseTypeId;
    }

    if (priorityId) {
      where.val_cr_priority_id_fk = priorityId;
    }

    if (statusMovementId) {
      where.val_cr_statusmovement_id_fk = statusMovementId;
    } else {
      const namesMovement = [
        movementReport.ANULATION,
        movementReport.RETURN_CASE_ANALYST,
      ];

      const findMovementNames = await this.movementReportRepository.find({
        where: {
          mov_r_name: In(namesMovement),
        },
        select: ['id'],
      });

      const movementsIds = findMovementNames.map((movementId) => movementId.id);

      where.val_cr_statusmovement_id_fk = In(movementsIds);
    }

    where.val_cr_validated = false;

    const caseReportsValidate = await this.caseReportValidateRepository.find({
      where,
      relations: {
        movementReport: true,
        caseType: true,
        event: true,
        priority: true,
      },
      withDeleted: true,
    });

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportsValidate;
  }

  async findAllReportsValidate(): Promise<CaseReportValidateEntity[]> {
    const caseReportValidates = await this.caseReportValidateRepository.find({
      where: { val_cr_validated: false },
      relations: {
        movementReport: true,
        reportAnalystAssignment: true,
        synergy: true,
        caseType: true,
        riskType: true,
        severityClasification: true,
        origin: true,
        subOrigin: true,
        riskLevel: true,
        eventType: true,
        event: true,
        service: true,
        unit: true,
        priority: true,
      },
    });

    if (caseReportValidates.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportValidates;
  }

  async findOneReportValidate(id: string): Promise<CaseReportValidateEntity> {
    const caseReportValidate = await this.caseReportValidateRepository.findOne({
      where: { id, val_cr_validated: false },
      relations: {
        movementReport: true,
        reportAnalystAssignment: true,
        synergy: true,
        caseType: true,
        riskType: true,
        severityClasification: true,
        origin: true,
        subOrigin: true,
        riskLevel: true,
        eventType: true,
        event: true,
        service: true,
        unit: true,
        priority: true,
      },
    });

    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte.',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportValidate;
  }

  async findOneReportValidateByConsecutive(
    consecutive: string,
  ): Promise<CaseReportValidateEntity[]> {
    const caseReportValidate = await this.caseReportValidateRepository.find({
      where: {
        val_cr_filingnumber: Like(`%${consecutive}%`),
        val_cr_validated: false,
      },
      relations: {
        movementReport: true,
        reportAnalystAssignment: true,
        synergy: true,
        caseType: true,
        riskType: true,
        severityClasification: true,
        origin: true,
        subOrigin: true,
        riskLevel: true,
        eventType: true,
        event: true,
        service: true,
        unit: true,
        priority: true,
      },
    });

    if (caseReportValidate.length === 0) {
      throw new HttpException(
        'No se encontró el reporte.',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportValidate;
  }

  async updateReportValidate(
    id: string,
    updateCaseReportValidateDto: UpdateCaseReportValidateDto,
  ) {
    const caseReportValidate = await this.findOneReportValidate(id);
    const result = await this.caseReportValidateRepository.update(
      caseReportValidate.id,
      updateCaseReportValidateDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar caso validado ${caseReportValidate.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async cancelReportValidate(id: string, clientIp: string) {
    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.ANULATION,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(
        `El movimiento ${movementReport.ANULATION} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const caseReportValidate = await this.findOneReportValidate(id);

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      caseReportValidate.id,
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

    await this.medicineService.deleteMedicinesByCaseId(
      caseReportValidate.val_cr_originalcase_id_fk,
    );
    await this.deviceService.deleteDevicesByCaseId(
      caseReportValidate.val_cr_originalcase_id_fk,
    );

    const result = await this.caseReportValidateRepository.softDelete(
      caseReportValidate.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo anular el reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      caseReportValidate.id,
      caseReportValidate.val_cr_reporter_id,
      clientIp,
      logReports.LOG_ANULATION,
    );

    const findReportAnalystAssygnment =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ass_ra_validatedcase_id_fk: caseReportValidate.id,
        },
      });

    if (findReportAnalystAssygnment) {
      await this.reportAnalystAssygnmentService.deleteAssignedAnalyst(
        findReportAnalystAssygnment.id,
      );
    }

    const findSynergy = await this.synergyRepository.findOne({
      where: {
        syn_validatedcase_id_fk: caseReportValidate.id,
      },
    });

    if (findSynergy) {
      await this.synergyService.deleteSynergy(findSynergy.id);
    }

    const findResearchAssignment = await this.researchRepository.findOne({
      where: {
        res_validatedcase_id_fk: caseReportValidate.id,
      },
    });

    if (findResearchAssignment) {
      await this.researchService.deleteAssignedResearcher(
        findResearchAssignment.id,
      );
    }

    return new HttpException(
      `¡Datos anulados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
