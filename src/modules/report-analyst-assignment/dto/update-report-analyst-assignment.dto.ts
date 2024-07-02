import { PartialType } from '@nestjs/swagger';
import { ReportAnalystAssignmentDto } from './analyst-assignment.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateReportAnalystAssignmentDto extends PartialType(
  ReportAnalystAssignmentDto,
) {
  @IsOptional()
  @IsBoolean()
  ass_ra_status?: boolean;
}
