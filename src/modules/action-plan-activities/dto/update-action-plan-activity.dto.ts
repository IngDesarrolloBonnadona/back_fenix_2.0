import { PartialType } from '@nestjs/swagger';
import { CreateActionPlanActivityDto } from './create-action-plan-activity.dto';

export class UpdateActionPlanActivityDto extends PartialType(CreateActionPlanActivityDto) {}
