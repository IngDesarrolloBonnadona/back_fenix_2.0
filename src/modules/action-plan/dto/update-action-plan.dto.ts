import { PartialType } from '@nestjs/swagger';
import { CreateActionPlanDto } from './create-action-plan.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateActionPlanDto extends PartialType(CreateActionPlanDto) {
  @IsOptional()
  @IsBoolean()
  plan_a_status?: boolean;
}
