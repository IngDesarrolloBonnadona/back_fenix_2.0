import { Module } from '@nestjs/common';
import { ActionPlanCaseReportValidateService } from './services/action-plan-case-report-validate.service';
import { ActionPlanCaseReportValidateController } from './controllers/action-plan-case-report-validate.controller';

@Module({
  controllers: [ActionPlanCaseReportValidateController],
  providers: [ActionPlanCaseReportValidateService],
})
export class ActionPlanCaseReportValidateModule {}
