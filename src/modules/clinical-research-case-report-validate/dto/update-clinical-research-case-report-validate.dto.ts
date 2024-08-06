import { PartialType } from '@nestjs/swagger';
import { CreateClinicalResearchCaseReportValidateDto } from './create-clinical-research-case-report-validate.dto';

export class UpdateClinicalResearchCaseReportValidateDto extends PartialType(CreateClinicalResearchCaseReportValidateDto) {}
