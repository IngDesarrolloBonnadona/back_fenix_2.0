import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseReportOriginalDto } from '../dto/create-case-report-original.dto';
import { UpdateCaseReportOriginalDto } from '../dto/update-case-report-original.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseReportOriginal as CaseReportOriginalEntity } from '../entities/case-report-original.entity';
import { DataSource, Repository } from 'typeorm';
import { CaseReportValidate as CaseReportValidateEntity } from '../../case-report-validate/entities/case-report-validate.entity';
import { Medicine as MedicineEntity } from '../../medicine/entities/medicine.entity';
import { Device as DeviceEntity } from '../../device/entities/device.entity';
import { StatusReport as StatusReportEntity } from '../../status-report/entities/status-report.entity';
import { Log as LogEntity } from '../../log/entities/log.entity';
import { CreateMedicineDto } from '../../medicine/dto/create-medicine.dto';
import { CreateDeviceDto } from '../../device/dto/create-device.dto';
import { MovementReport as MovementReportEntity } from '../../movement-report/entities/movement-report.entity';
import { movementReport } from '../enums/movement-repoty.enum';
import { logReports } from 'src/enums/logs.enum';

@Injectable()
export class CaseReportOriginalService {
  constructor(
    @InjectRepository(CaseReportOriginalEntity)
    private readonly caseReportOriginalRepository: Repository<CaseReportOriginalEntity>,
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>,
    @InjectRepository(MedicineEntity)
    private readonly medicineRepository: Repository<MedicineEntity>,
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
    @InjectRepository(StatusReportEntity)
    private readonly statusReportRepository: Repository<StatusReportEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,
    private dataSource: DataSource,
  ) {}

  async createReportOriginalValidate(
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

      const caseReportValidate = new CaseReportValidateEntity();
      caseReportValidate.val_cr_originalcase_id_fk = caseReportOriginal.id;
      caseReportValidate.val_cr_casetype_id_fk = caseReportOriginal.ori_cr_casetype_id_fk;
      caseReportValidate.val_cr_patient_id_fk = caseReportOriginal.ori_cr_patient_id_fk;
      caseReportValidate.val_cr_reporter_id_fk = caseReportOriginal.ori_cr_reporter_id_fk;
      caseReportValidate.val_cr_eventtype_id_fk = caseReportOriginal.ori_cr_eventtype_id_fk;
      caseReportValidate.val_cr_service_id_fk = caseReportOriginal.ori_cr_service_id_fk;
      caseReportValidate.val_cr_event_id_fk = caseReportOriginal.ori_cr_event_id_fk;
      caseReportValidate.val_cr_risktype_id_fk = caseReportOriginal.ori_cr_risktype_id_fk;
      caseReportValidate.val_cr_severityclasif_id_fk = caseReportOriginal.ori_cr_severityclasif_id_fk;
      caseReportValidate.val_cr_origin_id_fk = caseReportOriginal.ori_cr_origin_id_fk;
      caseReportValidate.val_cr_suborigin_id_fk = caseReportOriginal.ori_cr_suborigin_id_fk;
      caseReportValidate.val_cr_risklevel_id_fk = caseReportOriginal.ori_cr_risklevel_id_fk;
      caseReportValidate.val_cr_unit_id_fk = caseReportOriginal.ori_cr_unit_id_fk;
      caseReportValidate.val_cr_description = caseReportOriginal.ori_cr_description;
      caseReportValidate.val_cr_inmediateaction = caseReportOriginal.ori_cr_inmediateaction;
      caseReportValidate.val_cr_materializedrisk = caseReportOriginal.ori_cr_materializedrisk;
      caseReportValidate.val_cr_associatedpatient = caseReportOriginal.ori_cr_associatedpatient;

      await queryRunner.manager.save(caseReportValidate)

      const hasMedicine = createMedicine && createMedicine.length > 0;
      const hasDevice = createDevice && createDevice.length > 0;

      if(hasMedicine) {
        for (const medicine of createMedicine) {
          const med = this.medicineRepository.create({
            ...medicine,
            med_case_id_fk: caseReportOriginal.id
          });
          await queryRunner.manager.save(med)
        }
      }

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
          m_r_status : true
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

      return { message: `Reporte #${reportData.caseReportOriginal.id} creado satisfactoriamente.`, data: reportData };
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

  async findAll() {
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

  async findOne(id: number) {
    const caseReportsOriginal = await this.caseReportOriginalRepository.findOne({ where: { id } });

    if (!caseReportsOriginal) {
      throw new HttpException(
        `No se encontró el caso numero #${id}.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsOriginal
  }

  async update(
    id: number,
    UpdateCaseReportOriginalDto: UpdateCaseReportOriginalDto,
  ) {
    const caseReportsOriginal = await this.findOne(id);

    // if (!CaseReportOriginal) {
    //   throw new NotFoundException();
    // }

    if (!caseReportsOriginal) {
      throw new HttpException(
        'No se encontró el caso.',
        HttpStatus.NOT_FOUND,
      );
    }
    

    Object.assign(caseReportsOriginal, UpdateCaseReportOriginalDto);

    caseReportsOriginal.updateAt = new Date();
    return await this.caseReportOriginalRepository.save(caseReportsOriginal);
  }

  async remove(id: number) {
    const caseReportsOriginal = await this.findOne(id);

    if (!caseReportsOriginal) {
      throw new HttpException(
        'No se encontró el caso.',
        HttpStatus.NOT_FOUND,
      );
    }

    caseReportsOriginal.deletedAt = new Date()
    caseReportsOriginal.ori_cr_status = false;

    return await this.caseReportOriginalRepository.save(caseReportsOriginal);
  }
}
