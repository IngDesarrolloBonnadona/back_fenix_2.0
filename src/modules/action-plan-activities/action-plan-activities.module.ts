import { Module } from '@nestjs/common';
import { ActionPlanActivitiesService } from './services/action-plan-activities.service';
import { ActionPlanActivitiesController } from './controllers/action-plan-activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionPlanActivity } from './entities/action-plan-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActionPlanActivity])],
  controllers: [ActionPlanActivitiesController],
  providers: [ActionPlanActivitiesService],
  exports: [ActionPlanActivitiesService]
})
export class ActionPlanActivitiesModule {}
