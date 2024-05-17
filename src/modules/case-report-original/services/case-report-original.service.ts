import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseReportOriginalDto } from '../dto/create-case-report-original.dto';
import { UpdateCaseReportOriginalDto } from '../dto/update-case-report-original.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseReportOriginal as CaseReportOriginalEntity } from '../entities/case-report-original.entity';
import { DataSource, Repository } from 'typeorm';
import { Medicine as MedicineEntity } from '../../medicine/entities/medicine.entity';
import { Device as DeviceEntity } from '../../device/entities/device.entity';
import { CreateMedicineDto } from '../../medicine/dto/create-medicine.dto';
import { CreateDeviceDto } from '../../device/dto/create-device.dto';
import { MovementReport as MovementReportEntity } from '../../movement-report/entities/movement-report.entity';
import { movementReport } from '../enums/movement-report.enum';
import { logReports } from 'src/enums/logs.enum';
import { ValidateCaseReportOriginalDto } from '../dto/validate-case-report-original.dto';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { StatusReport as StatusReportEntity } from 'src/modules/status-report/entities/status-report.entity';
import { Log as LogEntity } from 'src/modules/log/entities/log.entity';

@Injectable()
export class CaseReportOriginalService {
  constructor(
    @InjectRepository(CaseReportOriginalEntity)
    private readonly caseReportOriginalRepository: Repository<CaseReportOriginalEntity>,
    @InjectRepository(MedicineEntity)
    private readonly medicineRepository: Repository<MedicineEntity>,
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,
    private readonly caseReportValidateService: CaseReportValidateService,
    private dataSource: DataSource,
  ) {}

  async validateReports (
    validateCaseReportOriginal: ValidateCaseReportOriginalDto,
  ) : Promise<any> {

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
      return { message: 'Existen casos similares encontrados', data: similarReport }
    } else {
      return { message: 'No existen casos similares'}
    }
  }

  async createReportOriginal(
    createCaseReportOriginal: CreateCaseReportOriginalDto,
    createMedicine: CreateMedicineDto[],
    createDevice: CreateDeviceDto[],
    clientIp: string,
  ) : Promise<any> {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const caseReportOriginal = this.caseReportOriginalRepository.create(createCaseReportOriginal)
      await queryRunner.manager.save(caseReportOriginal)

      const caseReportValidate = await this.caseReportValidateService.createReportValidateTransaction(queryRunner, caseReportOriginal)

      const hasMedicine = createMedicine && createMedicine.length > 0;
      
      if(hasMedicine) {
        for (const medicine of createMedicine) {
          const med = this.medicineRepository.create({
            ...medicine,
            med_case_id_fk: caseReportOriginal.id
          });

          await queryRunner.manager.save(med)
        }
      }
      
      const hasDevice = createDevice && createDevice.length > 0;

      if(hasDevice) {
        for (const device of createDevice) {
          const dev = this.deviceRepository.create({
            ...device,
            dev_case_id_fk: caseReportOriginal.id
          })

          await queryRunner.manager.save(dev)
        }
      }
      
      const movementReportFound = await this.movementReportRepository.findOne({
        where: {
          mov_r_name : movementReport.REPORT_CREATION,
          mov_r_status : true
        }
      })

      if (!movementReportFound) {
        throw new HttpException(
          `El movimiento ${movementReport.REPORT_CREATION} no existe.`,
          HttpStatus.NOT_FOUND
        )
      }

      const statusReport = new StatusReportEntity()
      statusReport.sta_r_originalcase_id_fk = caseReportOriginal.id;
      statusReport.sta_r_movement_id_fk = movementReportFound.id

      await queryRunner.manager.save(statusReport)

      const log = new LogEntity()
      log.log_validatedcase_id_fk = caseReportValidate.id;
      log.log_user_id_fk = caseReportOriginal.ori_cr_reporter_id_fk;
      log.log_action = logReports.LOG_CREATION;
      log.log_ip = clientIp

      await queryRunner.manager.save(log)   
        
      await queryRunner.commitTransaction();

      const reportData = {
        caseReportOriginal,
        caseReportValidate,
        createdMedicine: createMedicine,
        createdDevice: createDevice,
        statusReport,
        log,
      }

      return { message: `Reporte #${reportData.caseReportOriginal.id} se creó satisfactoriamente.`, data: reportData };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(
        `Un error a ocurrido: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    } finally{
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

    return caseReportsOriginal
  }

  async findOneReportOriginal(id: number) {
    const caseReportsOriginal = await this.caseReportOriginalRepository.findOneBy({ id });

    if (!caseReportsOriginal) {
      throw new HttpException(
        `No se encontró el caso numero #${id}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsOriginal
  }

  async updateReportOriginal(
    id: number,
    UpdateCaseReportOriginalDto: UpdateCaseReportOriginalDto,
  ) {
    const caseReportsOriginal = await this.findOneReportOriginal(id);

    Object.assign(caseReportsOriginal, UpdateCaseReportOriginalDto);

    caseReportsOriginal.updateAt = new Date();
    return await this.caseReportOriginalRepository.save(caseReportsOriginal);
  }

  async deleteReportOriginal(id: number) {
    const caseReportsOriginal = await this.findOneReportOriginal(id);
    const result = await this.caseReportOriginalRepository.softDelete(caseReportsOriginal.id);

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
