import { PartialType } from '@nestjs/swagger';
import { CreateResearcherDto } from './create-researcher.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateResearcherDto extends PartialType(CreateResearcherDto) {
  @IsOptional()
  @IsBoolean()
  res_status?: boolean;

  @IsOptional()
  @IsBoolean()
  res_isreturned?: boolean;
}
