import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateCaseReportOriginalDto } from '../dto/update-case-report-original.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseReportOriginal as CaseReportOriginalEntity } from '../entities/case-report-original.entity';
import { DataSource, Repository } from 'typeorm';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { OriDtoValidator } from '../utils/helpers/ori-dto-validator.helper';
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { StatusReportService } from 'src/modules/status-report/services/status-report.service';
import { LogService } from 'src/modules/log/services/log.service';
import { MedicineService } from 'src/modules/medicine/services/medicine.service';
import { DeviceService } from 'src/modules/device/services/device.service';
import { logReports } from 'src/enums/logs.enum';
import { generateFilingNumber } from '../utils/helpers/generate_filing_number.helper';
import { MovementReport as MovementReportEntity } from 'src/modules/movement-report/entities/movement-report.entity';
import { movementReport } from 'src/enums/movement-report.enum';
import { caseTypeReport } from 'src/enums/caseType-report.enum';
import { CreateOriRiskReportDto } from '../dto/create-ori-risk-report.dto';
import { CreateOriAdverseEventReportDto } from '../dto/create-ori-adverse-event-report.dto';
import { CreateOriIncidentReportDto } from '../dto/create-ori-incident-report.dto';
import { CreateOriIndicatingUnsafeCareReportDto } from '../dto/create-ori-indicating-unsafe-care-report.dto';
import { CreateOriComplicationsReportDto } from '../dto/create-ori-complications-report.dto';

@Injectable()
export class CaseReportOriginalService {
  constructor(
    @InjectRepository(CaseReportOriginalEntity)
    private readonly caseReportOriginalRepository: Repository<CaseReportOriginalEntity>,
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository: Repository<CaseTypeEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,

    private readonly caseReportValidateService: CaseReportValidateService,
    private readonly statusReportService: StatusReportService,
    private readonly logService: LogService,
    private readonly medicineService: MedicineService,
    private readonly deviceService: DeviceService,
    private dataSource: DataSource,
  ) {}

  async createReportOriginal(
    createReportOriDto: any,
    clientIp: string,
  ): Promise<any> {
    await OriDtoValidator(createReportOriDto);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const caseTypeFound = await this.caseTypeRepository.findOne({
        where: {
          id: createReportOriDto.ori_cr_casetype_id_fk,
        },
      });

      if (!caseTypeFound) {
        throw new HttpException(
          `El tipo de caso no existe.`,
          HttpStatus.NO_CONTENT,
        );
      }

      let caseReportOriginal: any;

      switch (caseTypeFound.cas_t_name) {
        case caseTypeReport.RISK:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportOriDto as CreateOriRiskReportDto,
          );
          console.log(`Se creó reporte ${caseTypeReport.RISK}`);
          break;
        case caseTypeReport.ADVERSE_EVENT:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportOriDto as CreateOriAdverseEventReportDto,
          );
          console.log(`Se creó reporte ${caseTypeReport.ADVERSE_EVENT}`);
          break;
        case caseTypeReport.INCIDENT:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportOriDto as CreateOriIncidentReportDto,
          );
          console.log(`Se creó reporte ${caseTypeReport.INCIDENT}`);
          break;
        case caseTypeReport.INDICATING_UNSAFE_CARE:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportOriDto as CreateOriIndicatingUnsafeCareReportDto,
          );
          console.log(`Se creó reporte ${caseTypeReport.INDICATING_UNSAFE_CARE}`);
          break;
        case caseTypeReport.COMPLICATIONS:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportOriDto as CreateOriComplicationsReportDto,
          );
          console.log(`Se creó reporte ${caseTypeReport.COMPLICATIONS}`);
          break;
          // agregar un tipo de caso nuevo
        default:
          throw new HttpException(
            'Tipo de caso no reconocido.',
            HttpStatus.BAD_REQUEST,
          );
      }

      const filingNumber = await generateFilingNumber(
        this.caseReportOriginalRepository,
      );

      caseReportOriginal.ori_cr_filingnumber = filingNumber;

      await queryRunner.manager.save(caseReportOriginal);

      const caseReportValidate =
        await this.caseReportValidateService.createReportValidateTransaction(
          queryRunner,
          caseReportOriginal,
          caseReportOriginal.id,
        );

      const hasMedicine =
        createReportOriDto.medicines && createReportOriDto.medicines.length > 0;

      if (hasMedicine) {
        await this.medicineService.createMedicineTransaction(
          createReportOriDto.medicines,
          caseReportOriginal.id,
          queryRunner,
        );
      }

      const hasDevice =
        createReportOriDto.devices && createReportOriDto.devices.length > 0;

      if (hasDevice) {
        await this.deviceService.createDeviceTransation(
          createReportOriDto.devices,
          caseReportOriginal.id,
          queryRunner,
        );
      }

      const movementReportFound = await this.movementReportRepository.findOne({
        where: {
          mov_r_name: movementReport.REPORT_CREATION,
          mov_r_status: true,
        },
      });

      if (!movementReportFound) {
        throw new HttpException(
          `El movimiento ${movementReport.REPORT_CREATION} no existe.`,
          HttpStatus.NO_CONTENT,
        );
      }

      const statusReport =
        await this.statusReportService.createStatusReportTransaction(
          queryRunner,
          caseReportOriginal.id,
          movementReportFound.id,
        );

      const log = await this.logService.createLogTransaction(
        queryRunner,
        caseReportValidate.id,
        caseReportOriginal.ori_cr_reporter_id_fk,
        clientIp,
        logReports.LOG_CREATION,
      );

      await queryRunner.commitTransaction(); // registro

      const reportData = {
        caseReportOriginal,
        caseReportValidate,
        createdMedicine: createReportOriDto.medicines,
        createdDevice: createReportOriDto.devices,
        statusReport,
        log,
      };

      return {
        message: `Reporte ${caseReportOriginal.ori_cr_filingnumber} se creó satisfactoriamente.`,
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

  async findAllReportsOriginal() {
    const caseReportsOriginal = await this.caseReportOriginalRepository.find({
      relations: {
        caseReportValidate: true,
        medicine: true,
        device: true,
        statusReport: true,
        caseType: true,
        riskType: true,
        severityClasification: true,
        origin: true,
        subOrigin: true,
        riskLevel: true,
        event: true,
        eventType: true,
        service: true,
        unit: true,
      },
    });

    if (!caseReportsOriginal || caseReportsOriginal.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportsOriginal;
  }

  async findOneReportOriginal(id: string) {
    const caseReportsOriginal = await this.caseReportOriginalRepository.findOne({
        where: { id },
        relations: {
          caseReportValidate: true,
          medicine: true,
          device: true,
          statusReport: true,
          caseType: true,
          riskType: true,
          severityClasification: true,
          origin: true,
          subOrigin: true,
          riskLevel: true,
          event: true,
          eventType: true,
          service: true,
          unit: true,
        },
      });

    if (!caseReportsOriginal) {
      throw new HttpException(
        `No se encontró el reporte.`,
        HttpStatus.NO_CONTENT,
      );
    }

    return caseReportsOriginal;
  }

  async updateReportOriginal(
    id: string,
    UpdateCaseReportOriginalDto: UpdateCaseReportOriginalDto,
  ) {
    const caseReportsOriginal = await this.findOneReportOriginal(id);
    const result = await this.caseReportOriginalRepository.update(
      caseReportsOriginal.id,
      UpdateCaseReportOriginalDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el caso original #${caseReportsOriginal.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteReportOriginal(id: string) {
    const caseReportsOriginal = await this.findOneReportOriginal(id);
    const result = await this.caseReportOriginalRepository.softDelete(
      caseReportsOriginal.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el caso #${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
