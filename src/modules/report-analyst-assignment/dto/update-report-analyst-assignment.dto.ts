import { PartialType } from '@nestjs/swagger';
import { CreateReportAnalystAssignmentDto } from './create-report-analyst-assignment.dto';

export class UpdateReportAnalystAssignmentDto extends PartialType(
  CreateReportAnalystAssignmentDto,
) {}
