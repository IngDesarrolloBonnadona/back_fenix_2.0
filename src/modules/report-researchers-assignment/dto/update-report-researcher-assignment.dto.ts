import { PartialType } from '@nestjs/swagger';
import { CreateReportResearcherAssignmentDto } from './create-report-researcher-assignment.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateReportResearcherAssignmentDto extends PartialType(
  CreateReportResearcherAssignmentDto,
) {
  @IsOptional()
  @IsBoolean()
  res_status?: boolean;
}
