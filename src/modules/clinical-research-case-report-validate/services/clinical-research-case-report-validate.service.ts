import { Injectable } from '@nestjs/common';
import { CreateClinicalResearchCaseReportValidateDto } from '../dto/create-clinical-research-case-report-validate.dto';
import { UpdateClinicalResearchCaseReportValidateDto } from '../dto/update-clinical-research-case-report-validate.dto';

@Injectable()
export class ClinicalResearchCaseReportValidateService {
  create(
    createClinicalResearchCaseReportValidateDto: CreateClinicalResearchCaseReportValidateDto,
  ) {
    return 'This action adds a new clinicalResearchCaseReportValidate';
  }

  findAll() {
    return `This action returns all clinicalResearchCaseReportValidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalResearchCaseReportValidate`;
  }

  update(
    id: number,
    updateClinicalResearchCaseReportValidateDto: UpdateClinicalResearchCaseReportValidateDto,
  ) {
    return `This action updates a #${id} clinicalResearchCaseReportValidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalResearchCaseReportValidate`;
  }
}
