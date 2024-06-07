import { PartialType } from '@nestjs/swagger';
import { ReportAnalystAssignmentDto } from './analyst-assignment.dto';

export class UpdateReportAnalystAssignmentDto extends PartialType(
  ReportAnalystAssignmentDto,
) {}
