import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseReportOriginalDto } from './create-case-report-original.dto';

export class UpdateCaseReportOriginalDto extends PartialType(CreateCaseReportOriginalDto) {}
