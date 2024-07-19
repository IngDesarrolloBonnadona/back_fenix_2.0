import { Module } from '@nestjs/common';
import { ActionPlanActivitiesService } from './services/action-plan-activities.service';
import { ActionPlanActivitiesController } from './controllers/action-plan-activities.controller';

@Module({
  controllers: [ActionPlanActivitiesController],
  providers: [ActionPlanActivitiesService],
})
export class ActionPlanActivitiesModule {}
