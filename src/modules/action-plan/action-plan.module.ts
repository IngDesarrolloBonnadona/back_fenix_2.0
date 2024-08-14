import { Module } from '@nestjs/common';
import { ActionPlanService } from './services/action-plan.service';
import { ActionPlanController } from './controllers/action-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionPlan } from './entities/action-plan.entity';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';
import { CaseTypeModule } from '../case-type/case-type.module';
import { EventTypeModule } from '../event-type/event-type.module';
import { EventModule } from '../event/event.module';
import { ServiceModule } from '../service/service.module';
import { UnitModule } from '../unit/unit.module';
import { PriorityModule } from '../priority/priority.module';
import { PositionModule } from '../position/position.module';
import { ActionPlanActivitiesModule } from '../action-plan-activities/action-plan-activities.module';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActionPlan]),
    CaseReportValidateModule,
    CaseTypeModule,
    EventTypeModule,
    EventModule,
    ServiceModule,
    UnitModule,
    PriorityModule,
    PositionModule,
    ActionPlanActivitiesModule,
    UserModule,
  ],
  controllers: [ActionPlanController],
  providers: [ActionPlanService],
})
export class ActionPlanModule {}
