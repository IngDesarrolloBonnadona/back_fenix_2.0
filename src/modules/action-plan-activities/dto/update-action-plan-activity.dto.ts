import { PartialType } from '@nestjs/swagger';
import { CreateActionPlanActivityDto } from './create-action-plan-activity.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateActionPlanActivityDto extends PartialType(
  CreateActionPlanActivityDto,
) {
  @IsOptional()
  @IsBoolean()
  plan_aa_status?: boolean;
}
