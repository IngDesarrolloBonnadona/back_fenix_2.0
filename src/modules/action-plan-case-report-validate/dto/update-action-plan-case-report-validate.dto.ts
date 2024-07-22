import { PartialType } from '@nestjs/swagger';
import { CreateActionPlanCaseReportValidateDto } from './create-action-plan-case-report-validate.dto';

export class UpdateActionPlanCaseReportValidateDto extends PartialType(CreateActionPlanCaseReportValidateDto) {}
