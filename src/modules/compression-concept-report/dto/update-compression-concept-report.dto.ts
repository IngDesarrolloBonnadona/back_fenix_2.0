import { PartialType } from '@nestjs/swagger';
import { CreateCompressionConceptReportDto } from './create-compression-concept-report.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCompressionConceptReportDto extends PartialType(
  CreateCompressionConceptReportDto,
) {
  @IsOptional()
  @IsBoolean()
  comp_c_status?: boolean;
}
