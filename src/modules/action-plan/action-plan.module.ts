import { Module } from '@nestjs/common';
import { ActionPlanService } from './services/action-plan.service';
import { ActionPlanController } from './action-plan.controller';

@Module({
  controllers: [ActionPlanController],
  providers: [ActionPlanService],
})
export class ActionPlanModule {}
