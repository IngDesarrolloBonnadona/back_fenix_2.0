import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseReportValidateDto } from './create-case-report-validate.dto';

export class UpdateCaseReportValidateDto extends PartialType(CreateCaseReportValidateDto) {}
