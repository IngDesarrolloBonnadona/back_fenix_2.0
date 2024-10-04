import { Injectable } from '@nestjs/common';
import { CreateClinicalResearchCaseReportValidateDto } from '../dto/create-clinical-research-case-report-validate.dto';
import { UpdateClinicalResearchCaseReportValidateDto } from '../dto/update-clinical-research-case-report-validate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalResearchCaseReportValidate as ClinicalResearchCaseReportValidateEntity } from '../entities/clinical-research-case-report-validate.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class ClinicalResearchCaseReportValidateService {
  constructor(
    @InjectRepository(ClinicalResearchCaseReportValidateEntity)
    private readonly clinicalResearchCaseReportValidateRepository: Repository<ClinicalResearchCaseReportValidateEntity>,
  ) {}
  async createClinicalResearchCaseReportValidateTransaction(
    clinicalResearchCaseReportValidate: CreateClinicalResearchCaseReportValidateDto[],
    clinicalResearchId: string,
    queryRunner: QueryRunner,
  ) {
    const existingClinicalResearchCaseReportValidate =
      await queryRunner.manager.find(ClinicalResearchCaseReportValidateEntity, {
        where: { res_crv_clinicalresearch_id_fk: clinicalResearchId },
      });

    if (existingClinicalResearchCaseReportValidate.length > 0) {
      await queryRunner.manager.remove(
        existingClinicalResearchCaseReportValidate,
      );
    }

    for (const clinicalResearchCRV of clinicalResearchCaseReportValidate) {
      const data = queryRunner.manager.create(
        ClinicalResearchCaseReportValidateEntity,
        {
          ...clinicalResearchCRV,
          res_crv_clinicalresearch_id_fk: clinicalResearchId,
        },
      );

      await queryRunner.manager.save(data);
    }
  }
}
