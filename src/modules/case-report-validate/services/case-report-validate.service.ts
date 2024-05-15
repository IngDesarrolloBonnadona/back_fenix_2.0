import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseReportValidateDto } from '../dto/create-case-report-validate.dto';
import { UpdateCaseReportValidateDto } from '../dto/update-case-report-validate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseReportValidate as CaseReportValidateEntity } from '../entities/case-report-validate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CaseReportValidateService {
  constructor(
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>
  ){}

  async createReportValidateTransaction(
    queryRunner: any,
    caseReportOriginal: any): Promise<CaseReportValidateEntity> {
    const caseReportValidate = this.caseReportValidateRepository.create({
      val_cr_originalcase_id_fk : caseReportOriginal.id,
      val_cr_casetype_id_fk : caseReportOriginal.ori_cr_casetype_id_fk,
      val_cr_patient_id_fk : caseReportOriginal.ori_cr_patient_id_fk,
      val_cr_reporter_id_fk : caseReportOriginal.ori_cr_reporter_id_fk,
      val_cr_eventtype_id_fk : caseReportOriginal.ori_cr_eventtype_id_fk,
      val_cr_service_id_fk : caseReportOriginal.ori_cr_service_id_fk,
      val_cr_event_id_fk : caseReportOriginal.ori_cr_event_id_fk,
      val_cr_risktype_id_fk : caseReportOriginal.ori_cr_risktype_id_fk,
      val_cr_severityclasif_id_fk : caseReportOriginal.ori_cr_severityclasif_id_fk,
      val_cr_origin_id_fk : caseReportOriginal.ori_cr_origin_id_fk,
      val_cr_suborigin_id_fk : caseReportOriginal.ori_cr_suborigin_id_fk,
      val_cr_risklevel_id_fk : caseReportOriginal.ori_cr_risklevel_id_fk,
      val_cr_unit_id_fk : caseReportOriginal.ori_cr_unit_id_fk,
      val_cr_description : caseReportOriginal.ori_cr_description,
      val_cr_inmediateaction : caseReportOriginal.ori_cr_inmediateaction,
      val_cr_materializedrisk : caseReportOriginal.ori_cr_materializedrisk,
      val_cr_associatedpatient : caseReportOriginal.ori_cr_associatedpatient,
    })
    return await queryRunner.manager.save(caseReportValidate)
  }

  async findAllReportsValidate() {
    const caseReportValidates = await this.caseReportValidateRepository.find({
      relations:{
        caseReportOriginal: true,
        log: true
      }
    });

    if (!caseReportValidates) {
      throw new HttpException(
        'No se encontró la lista de reportes validado',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportValidates
  }

  async findOneReportValidate(id: number) {
const caseReportValidate = await this.caseReportValidateRepository.findOne({ where: { id } });

    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte validado',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportValidate
  }

  async updateReportValidate(id: number, updateCaseReportValidateDto: UpdateCaseReportValidateDto) {
    const caseReportValidate = await this.findOneReportValidate(id);

    // Valida si existe
    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte validado',
        HttpStatus.NOT_FOUND,
      );
    }

    // Actualiza los campos con los valores proporcionados
    Object.assign(caseReportValidate, updateCaseReportValidateDto)

    caseReportValidate.updateAt = new Date();
    
    return this.caseReportValidateRepository.save(caseReportValidate);
  }

  async removeReportValidate(id: number) {
    const caseReportValidate = await this.findOneReportValidate(id);

    const isEliminated = this.caseReportValidateRepository.softDelete(caseReportValidate.id)

    if (isEliminated) {
      throw new HttpException(
        `El caso #${id} se eliminó correctamente`,
        HttpStatus.OK,
      );
    } 
  }
}
