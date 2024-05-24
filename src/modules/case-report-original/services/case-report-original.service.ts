import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UpdateCaseReportOriginalDto } from '../dto/update-case-report-original.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseReportOriginal as CaseReportOriginalEntity } from '../entities/case-report-original.entity';
import { DataSource, Repository } from 'typeorm';
import { ValidateCaseReportOriginalDto } from '../dto/validate-case-report-original.dto';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { dtoValidator } from '../utils/helpers/dto-validator.helper';
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { StatusReportService } from 'src/modules/status-report/services/status-report.service';
import { LogService } from 'src/modules/log/services/log.service';
import { MedicineService } from 'src/modules/medicine/services/medicine.service';
import { DeviceService } from 'src/modules/device/services/device.service';
import { reportCreatorDictionary } from '../utils/helpers/report-creator.helper';

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
          `El tipo de caso no existe.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const dtoClass = reportCreatorDictionary[caseTypeFound.cas_t_name];
      console.log("dtoClass:",dtoClass)

      if (!dtoClass) {
        throw new HttpException(
          'Tipo de caso no reconocido.', 
          HttpStatus.BAD_REQUEST);
      }

      const caseReportOriginal = new CaseReportOriginalEntity();
      Object.assign(caseReportOriginal, createReportDto)

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
