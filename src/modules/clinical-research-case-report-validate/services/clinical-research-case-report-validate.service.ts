import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QueryRunner, Repository } from 'typeorm';

import { CreateClinicalResearchCaseReportValidateDto } from '../dto/create-clinical-research-case-report-validate.dto';

import { ClinicalResearchCaseReportValidate } from '../entities/clinical-research-case-report-validate.entity';

@Injectable()
export class ClinicalResearchCaseReportValidateService {
  constructor(
    @InjectRepository(ClinicalResearchCaseReportValidate)
    private readonly clinicalResearchCaseReportValidateRepository: Repository<ClinicalResearchCaseReportValidate>,
  ) {}
  async createClinicalResearchCaseReportValidateTransaction(
    clinicalResearchCaseReportValidate: CreateClinicalResearchCaseReportValidateDto[],
    clinicalResearchId: string,
    queryRunner: QueryRunner,
  ) {
    const existingClinicalResearchCaseReportValidate =
      await queryRunner.manager.find(ClinicalResearchCaseReportValidate, {
        where: { res_crv_clinicalresearch_id_fk: clinicalResearchId },
      });

    if (existingClinicalResearchCaseReportValidate.length > 0) {
      await queryRunner.manager.remove(
        existingClinicalResearchCaseReportValidate,
      );
    }

    for (const clinicalResearchCRV of clinicalResearchCaseReportValidate) {
      const data = queryRunner.manager.create(
        ClinicalResearchCaseReportValidate,
        {
          ...clinicalResearchCRV,
          res_crv_clinicalresearch_id_fk: clinicalResearchId,
        },
      );

      await queryRunner.manager.save(data);
    }
  }
}
