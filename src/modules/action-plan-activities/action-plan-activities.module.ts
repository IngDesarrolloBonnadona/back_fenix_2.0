import { Module } from '@nestjs/common';
import { ActionPlanActivitiesService } from './action-plan-activities.service';
import { ActionPlanActivitiesController } from './action-plan-activities.controller';

@Module({
  controllers: [ActionPlanActivitiesController],
  providers: [ActionPlanActivitiesService],
})
export class ActionPlanActivitiesModule {}
