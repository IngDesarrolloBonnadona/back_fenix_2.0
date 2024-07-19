import { Module } from '@nestjs/common';
import { ActionPlanService } from './services/action-plan.service';
import { ActionPlanController } from './controllers/action-plan.controller';

@Module({
  controllers: [ActionPlanController],
  providers: [ActionPlanService],
})
export class ActionPlanModule {}
