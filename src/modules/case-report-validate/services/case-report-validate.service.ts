import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseReportValidateDto } from '../dto/create-case-report-validate.dto';
import { UpdateCaseReportValidateDto } from '../dto/update-case-report-validate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseReportValidate as CaseReportValidateEntity } from '../entities/case-report-validate.entity';
import { Between, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
import { CreateCaseReportOriginalDto } from 'src/modules/case-report-original/dto/create-case-report-original.dto';
import { FindSimilarCaseReportValidateDto } from '../dto/find-similar-case-report-validate';

@Injectable()
export class CaseReportValidateService {
  constructor(
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>
  ){}

  async findSimilarCaseReportsValidate(
    similarCaseReportValidate: FindSimilarCaseReportValidateDto
  ) {
    const similarReport = await this.caseReportValidateRepository.find({
      where: {
        val_cr_casetype_id_fk: similarCaseReportValidate.val_cr_casetype_id_fk,
        val_cr_unit_id_fk: similarCaseReportValidate.val_cr_unit_id_fk,
        val_cr_patient_id_fk: similarCaseReportValidate.val_cr_patient_id_fk,
        val_cr_event_id_fk: similarCaseReportValidate.val_cr_event_id_fk,
        val_cr_eventtype_id_fk: similarCaseReportValidate.val_cr_eventtype_id_fk,
        val_cr_validated: false
      }
    });

    if (similarReport.length > 0) {
      return {
        message: `¡Extisten ${similarReport.length} casos similares!`,
        data: similarReport
      };
    } else {
      return { message: '¡No existen casos similares!'}
    }
  }

  async createReportValidateTransaction(
    queryRunner: QueryRunner,
    caseReportOriginal: CreateCaseReportOriginalDto,
    caseReportOriginalId: string):
    Promise<CaseReportValidateEntity> {
    const caseReportValidate = this.caseReportValidateRepository.create({
      val_cr_previous_id: 0,
      val_cr_originalcase_id_fk : caseReportOriginalId,
      val_cr_filingnumber : caseReportOriginal.ori_cr_filingnumber,
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
    return await queryRunner.manager.save(caseReportValidate) //temporal
  }


  async SummaryReportsValidate(
    creationDate?: Date,
    filingNumber?: string,
    patientId?: number,
    caseTypeId?: number,
  ) : Promise<CaseReportValidateEntity[]> {
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

    if (caseTypeId){
      where.val_cr_casetype_id_fk = caseTypeId;
    }

    where.val_cr_validated = false;

    const caseReportsValidate = await this.caseReportValidateRepository.find({
      where
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

  async findOneReportValidate(id: string) {
const caseReportValidate = await this.caseReportValidateRepository.findOne({ where: { id } });

    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte validado',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportValidate
  }

  async updateReportValidate(id: string, updateCaseReportValidateDto: UpdateCaseReportValidateDto) {
    const caseReportValidate = await this.findOneReportValidate(id);
    const result = await this.caseReportValidateRepository.update(caseReportValidate.id, updateCaseReportValidateDto);
    
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

  async removeReportValidate(id: string) {
    const caseReportValidate = await this.findOneReportValidate(id);
    const result = await this.caseReportValidateRepository.softDelete(caseReportValidate.id)

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el reporte validado`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
