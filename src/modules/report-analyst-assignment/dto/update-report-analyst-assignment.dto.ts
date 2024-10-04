import { PartialType } from '@nestjs/swagger';
import { CreateReportAnalystAssignmentDto } from './create-report-analyst-assignment.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateReportAnalystAssignmentDto extends PartialType(
  CreateReportAnalystAssignmentDto,
) {
  @IsOptional()
  @IsBoolean()
  ana_status?: boolean;
}
