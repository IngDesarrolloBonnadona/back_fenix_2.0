import { Module } from '@nestjs/common';
import { ClinicalResearchCaseReportValidateService } from './services/clinical-research-case-report-validate.service';
import { ClinicalResearchCaseReportValidateController } from './controllers/clinical-research-case-report-validate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalResearchCaseReportValidate } from './entities/clinical-research-case-report-validate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalResearchCaseReportValidate])],
  controllers: [ClinicalResearchCaseReportValidateController],
  providers: [ClinicalResearchCaseReportValidateService],
  exports: [ClinicalResearchCaseReportValidateService],
})
export class ClinicalResearchCaseReportValidateModule {}
