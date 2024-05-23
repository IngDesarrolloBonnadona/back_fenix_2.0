import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCaseReportOriginalDto } from '../dto/update-case-report-original.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseReportOriginal as CaseReportOriginalEntity } from '../entities/case-report-original.entity';
import { DataSource, Repository } from 'typeorm';
import { Medicine as MedicineEntity } from '../../medicine/entities/medicine.entity';
import { Device as DeviceEntity } from '../../device/entities/device.entity';
import { logReports } from 'src/enums/logs.enum';
import { ValidateCaseReportOriginalDto } from '../dto/validate-case-report-original.dto';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { Log as LogEntity } from 'src/modules/log/entities/log.entity';
import { CreateOriRiskReportDto } from '../dto/create-ori-risk-report.dto';
import { CreateOriAdverseEventReportDto } from '../dto/create-ori-adverse-event-report.dto';
import { CreateOriComplicationsReportDto } from '../dto/create-ori-complications-report.dto';
import { CreateOriIncidentReportDto } from '../dto/create-ori-incident-report.dto';
import { CreateOriIndicatingUnsafeCareReportDto } from '../dto/create-ori-indicating-unsafe-care-report.dto';
import { dtoValidator } from '../utils/helpers/dto-validator.helper';
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { caseTypeReport } from '../utils/enums/caseType-report.enum';
import { StatusReportService } from 'src/modules/status-report/services/status-report.service';
import { LogService } from 'src/modules/log/services/log.service';
import { MedicineService } from 'src/modules/medicine/services/medicine.service';
import { DeviceService } from 'src/modules/device/services/device.service';

@Injectable()
export class CaseReportOriginalService {
  constructor(
    @InjectRepository(CaseReportOriginalEntity)
    private readonly caseReportOriginalRepository: Repository<CaseReportOriginalEntity>,
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository: Repository<CaseTypeEntity>,

    private readonly caseReportValidateService: CaseReportValidateService,
    private readonly statusReportService: StatusReportService,
    private readonly logService: LogService,
    private readonly medicineService: MedicineService,
    private readonly deviceService: DeviceService,
    private dataSource: DataSource,
  ) {}

  async validateReports(
    validateCaseReportOriginal: ValidateCaseReportOriginalDto,
  ): Promise<any> {
    const similarReport = await this.caseReportOriginalRepository.find({
      where: {
        ori_cr_casetype_id_fk: validateCaseReportOriginal.ori_cr_casetype_id_fk,
        ori_cr_unit_id_fk: validateCaseReportOriginal.ori_cr_unit_id_fk,
        ori_cr_patient_id_fk: validateCaseReportOriginal.ori_cr_patient_id_fk,
        ori_cr_event_id_fk: validateCaseReportOriginal.ori_cr_event_id_fk,
        ori_cr_eventtype_id_fk: validateCaseReportOriginal.ori_cr_eventtype_id_fk,
      },
    });

    if (similarReport.length > 0) {
      return {
        message: 'Existen casos similares encontrados',
        data: similarReport,
      };
    } else {
      return { message: 'No existen casos similares' };
    }
  }

  async createReportOriginal(
    createReportDto: any,
    clientIp: string,
  ): Promise<any> {
    await dtoValidator(createReportDto);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const caseTypeFound = await this.caseTypeRepository.findOne({
        where: {
          id: createReportDto.ori_cr_casetype_id_fk,
        },
      });

      if (!caseTypeFound) {
        throw new HttpException(
          `El tipo de caso no existe no existe.`,
          HttpStatus.NOT_FOUND,
        );
      }

      let caseReportOriginal: any;

      switch (caseTypeFound.cas_t_name) {
        case caseTypeReport.RISK:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportDto as CreateOriRiskReportDto,
          );
          console.log('Llegó aquí CreateOriRiskReportDto');
          break;
        case caseTypeReport.ADVERSE_EVENT:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportDto as CreateOriAdverseEventReportDto,
          );
          console.log('Llegó aquí CreateOriAdverseEventReportDto');
          break;
        case caseTypeReport.INCIDENT:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportDto as CreateOriIncidentReportDto,
          );
          console.log('Llegó aquí CreateOriIncidentReportDto');
          break;
        case caseTypeReport.INDICATING_UNSAFE_CARE:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportDto as CreateOriIndicatingUnsafeCareReportDto,
          );
          console.log('Llegó aquí CreateOriIndicatingUnsafeCareReportDto');
          break;
        case caseTypeReport.COMPLICATIONS:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportDto as CreateOriComplicationsReportDto,
          );
          console.log('Llegó aquí CreateOriComplicationsReportDto');
          break;
          // agregar un tipo de caso nuevo
        default:
          throw new HttpException(
            'Tipo de caso no reconocido.',
            HttpStatus.BAD_REQUEST,
          );
      }

      await queryRunner.manager.save(caseReportOriginal);

      const caseReportValidate = await this.caseReportValidateService.createReportValidateTransaction(
          queryRunner,
          caseReportOriginal,
        );

      const hasMedicine =
        createReportDto.medicines && createReportDto.medicines.length > 0;

      if (hasMedicine) {
        await this.medicineService.createMedicineTransaction(
          createReportDto.medicines,
          caseReportOriginal.id,
          queryRunner,
        )
      }

      const hasDevice = 
        createReportDto.devices && createReportDto.devices.length > 0;

      if (hasDevice) {
        await this.deviceService.createDeviceTransation(
          createReportDto.devices,
          caseReportOriginal.id,
          queryRunner,
        )
      }

      const statusReport = await this.statusReportService.createStatusReportTransaction(
          queryRunner,
          caseReportOriginal.id,
        );

      const log = await this.logService.createLogTransaction(
        queryRunner,
        caseReportValidate.id,
        caseReportOriginal.ori_cr_reporter_id_fk,
        clientIp
      )

      await queryRunner.commitTransaction();

      const reportData = {
        caseReportOriginal,
        caseReportValidate,
        createdMedicine: createReportDto.medicines,
        createdDevice: createReportDto.devices,
        statusReport,
        log,
      };

      return {
        message: `Reporte #${reportData.caseReportOriginal.id} se creó satisfactoriamente.`,
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

    if (!caseReportsOriginal) {
      throw new HttpException(
        'No hay reportes creados actualmente.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsOriginal;
  }

  async findOneReportOriginal(id: number) {
    const caseReportsOriginal =
      await this.caseReportOriginalRepository.findOneBy({ id });

    if (!caseReportsOriginal) {
      throw new HttpException(
        `No se encontró el caso numero #${id}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsOriginal;
  }

  async updateReportOriginal(
    id: number,
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

  async deleteReportOriginal(id: number) {
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
