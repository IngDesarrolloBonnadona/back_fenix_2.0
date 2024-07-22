import { Module } from '@nestjs/common';
import { ActionPlanCaseReportValidateService } from './services/action-plan-case-report-validate.service';
import { ActionPlanCaseReportValidateController } from './controllers/action-plan-case-report-validate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionPlanCaseReportValidate } from './entities/action-plan-case-report-validate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActionPlanCaseReportValidate])],
  controllers: [ActionPlanCaseReportValidateController],
  providers: [ActionPlanCaseReportValidateService],
  exports: [ActionPlanCaseReportValidateService],
})
export class ActionPlanCaseReportValidateModule {}
