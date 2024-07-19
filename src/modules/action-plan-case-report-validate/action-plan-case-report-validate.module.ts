import { Module } from '@nestjs/common';
import { ActionPlanCaseReportValidateService } from './action-plan-case-report-validate.service';
import { ActionPlanCaseReportValidateController } from './action-plan-case-report-validate.controller';

@Module({
  controllers: [ActionPlanCaseReportValidateController],
  providers: [ActionPlanCaseReportValidateService],
})
export class ActionPlanCaseReportValidateModule {}
