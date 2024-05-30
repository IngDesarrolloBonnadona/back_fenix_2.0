import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCaseReportValidateDto } from '../dto/create-case-report-validate.dto';
import { UpdateCaseReportValidateDto } from '../dto/update-case-report-validate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseReportValidate as CaseReportValidateEntity } from '../entities/case-report-validate.entity';
import {
  Between,
  DataSource,
  FindOptionsWhere,
  QueryRunner,
  Repository,
} from 'typeorm';
import { CreateCaseReportOriginalDto } from 'src/modules/case-report-original/dto/create-case-report-original.dto';
import { FindSimilarCaseReportValidateDto } from '../dto/find-similar-case-report-validate';
import { ValDtoValidator } from '../helper/val-dto-validator.helper';
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { reportCreatorValDictionary } from '../helper/report-val-creator.helper';
import { MedicineService } from 'src/modules/medicine/services/medicine.service';
import { DeviceService } from 'src/modules/device/services/device.service';
import { MovementReport as MovementReportEntity } from 'src/modules/movement-report/entities/movement-report.entity';
import { movementReport } from 'src/enums/movement-report.enum';
import { StatusReportService } from 'src/modules/status-report/services/status-report.service';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/enums/logs.enum';

@Injectable()
export class CaseReportValidateService {
  constructor(
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>,
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository: Repository<CaseTypeEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,

    private readonly medicineService: MedicineService,
    private readonly deviceService: DeviceService,
    private readonly statusReportService: StatusReportService,
    private readonly logService: LogService,
    private dataSource: DataSource,
  ) {}

  async findSimilarCaseReportsValidate(
    similarCaseReportValidate: FindSimilarCaseReportValidateDto,
  ) {
    const similarReport = await this.caseReportValidateRepository.find({
      where: {
        val_cr_casetype_id_fk: similarCaseReportValidate.val_cr_casetype_id_fk,
        val_cr_unit_id_fk: similarCaseReportValidate.val_cr_unit_id_fk,
        val_cr_patient_id_fk: similarCaseReportValidate.val_cr_patient_id_fk,
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
      const caseTypeFound = await this.caseTypeRepository.findOne({
        where: {
          id: createReportValDto.val_cr_casetype_id_fk,
        },
      });

      if (!caseTypeFound) {
        throw new HttpException(
          `El tipo de caso no existe.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const dtoClass = reportCreatorValDictionary[caseTypeFound.cas_t_name];
      console.log('dtoClass:', dtoClass);

      if (!dtoClass) {
        throw new HttpException(
          'Tipo de caso no reconocido.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const previousReport = await this.caseReportValidateRepository.findOne({
        where: {
          id: reportId,
          val_cr_validated: false,
        },
      });

      if (!previousReport) {
        throw new HttpException(
          `El reporte no existe o ya fue validado.`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (previousReport) {
        previousReport.val_cr_validated = true;

        await queryRunner.manager.save(previousReport);
      }

      const consecutiveId = previousReport.val_cr_consecutive_id + 1;
      const previousId = previousReport.val_cr_previous_id + 1;

      const caseReportValidate = new CaseReportValidateEntity();
      Object.assign(caseReportValidate, createReportValDto);
      caseReportValidate.val_cr_filingnumber =
        previousReport.val_cr_filingnumber;
      caseReportValidate.val_cr_originalcase_id_fk =
        previousReport.val_cr_originalcase_id_fk;
      caseReportValidate.val_cr_consecutive_id = consecutiveId;
      caseReportValidate.val_cr_previous_id = previousId;

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

      const movementReportFound = await this.movementReportRepository.findOne({
        where: {
          mov_r_name: movementReport.VALIDATION,
          mov_r_status: true,
        },
      });

      if (!movementReportFound) {
        throw new HttpException(
          `El movimiento ${movementReport.VALIDATION} no existe.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const statusReport =
        await this.statusReportService.createStatusReportTransaction(
          queryRunner,
          caseReportValidate.val_cr_originalcase_id_fk,
          movementReportFound.id,
        );

      await this.logService.createLogTransaction(
        queryRunner,
        caseReportValidate.id,
        caseReportValidate.val_cr_reporter_id_fk,
        clientIp,
        logReports.LOG_VALIDATION,
      );

      await queryRunner.commitTransaction();

      const reportData = {
        caseReportValidate,
        createdMedicine: createReportValDto.medicines,
        createdDevice: createReportValDto.devices,
        statusReport
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
      val_cr_patient_id_fk: caseReportOriginal.ori_cr_patient_id_fk,
      val_cr_reporter_id_fk: caseReportOriginal.ori_cr_reporter_id_fk,
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
      val_cr_description: caseReportOriginal.ori_cr_description,
      val_cr_inmediateaction: caseReportOriginal.ori_cr_inmediateaction,
      val_cr_materializedrisk: caseReportOriginal.ori_cr_materializedrisk,
      val_cr_associatedpatient: caseReportOriginal.ori_cr_associatedpatient,
    });
    return await queryRunner.manager.save(caseReportValidate); //temporal
  }

  async SummaryReportsValidate(
    creationDate?: Date,
    filingNumber?: string,
    patientId?: number,
    caseTypeId?: number,
  ): Promise<CaseReportValidateEntity[]> {
    const where: FindOptionsWhere<CaseReportValidateEntity> = {};

    if (creationDate) {
      const nextDay = new Date(creationDate);
      nextDay.setDate(creationDate.getDate() + 1);

      where.createdAt = Between(creationDate, nextDay);
    }

    if (filingNumber) {
      where.val_cr_filingnumber = filingNumber;
    }

    if (patientId) {
      where.val_cr_patient_id_fk = patientId;
    }

    if (caseTypeId) {
      where.val_cr_casetype_id_fk = caseTypeId;
    }

    where.val_cr_validated = false;

    const caseReportsValidate = await this.caseReportValidateRepository.find({
      where,
    });

    if (!caseReportsValidate || caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async findAllReportsValidate() {
    const caseReportValidates = await this.caseReportValidateRepository.find({
      relations: {
        caseReportOriginal: true,
        log: true,
      },
    });

    if (!caseReportValidates) {
      throw new HttpException(
        'No se encontró la lista de reportes.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportValidates;
  }

  async findOneReportValidate(id: string) {
    const caseReportValidate = await this.caseReportValidateRepository.findOne({
      where: { id },
    });

    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte.',
        HttpStatus.NOT_FOUND,
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

  async cancelReportValidate(
    id: string,
    clientIp: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const caseReportValidate = await this.findOneReportValidate(id);

      caseReportValidate.val_cr_status = false;
      await queryRunner.manager.save(caseReportValidate);

      const result = await queryRunner.manager.softDelete(
        CaseReportValidateEntity,
        caseReportValidate.id,
      );

      if (result.affected === 0) {
        return new HttpException(
          `No se pudo anular el reporte.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await this.logService.createLogTransaction(
        queryRunner,
        caseReportValidate.id,
        caseReportValidate.val_cr_reporter_id_fk,
        clientIp,
        logReports.LOG_ANULATION,
      );

      await queryRunner.commitTransaction();

      return new HttpException(
        `¡Datos anulados correctamente!`,
        HttpStatus.ACCEPTED,
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(
        `Un error ha ocurrido: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
