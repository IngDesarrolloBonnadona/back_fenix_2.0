import { Module } from '@nestjs/common';
import { ClinicalResearchCaseReportValidateService } from './services/clinical-research-case-report-validate.service';
import { ClinicalResearchCaseReportValidateController } from './controllers/clinical-research-case-report-validate.controller';

@Module({
  controllers: [ClinicalResearchCaseReportValidateController],
  providers: [ClinicalResearchCaseReportValidateService],
})
export class ClinicalResearchCaseReportValidateModule {}
