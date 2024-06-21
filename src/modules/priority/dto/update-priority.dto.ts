import { PartialType } from '@nestjs/swagger';
import { CreatePriorityDto } from './create-priority.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePriorityDto extends PartialType(CreatePriorityDto) {
  @IsBoolean()
  @IsOptional()
  prior_status?: boolean;
}
