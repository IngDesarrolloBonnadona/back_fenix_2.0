import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActionPlanCaseReportValidateService } from '../services/action-plan-case-report-validate.service';
import { CreateActionPlanCaseReportValidateDto } from '../dto/create-action-plan-case-report-validate.dto';
import { UpdateActionPlanCaseReportValidateDto } from '../dto/update-action-plan-case-report-validate.dto';

@Controller('action-plan-case-report-validate')
export class ActionPlanCaseReportValidateController {
  constructor(private readonly actionPlanCaseReportValidateService: ActionPlanCaseReportValidateService) {}

  @Get('/findActionPlanCaseReportValidateByIdCase/:idCase')
  findActionPlanCaseReportValidateByIdCase(@Param('idCase') idCase: string) {
    return this.actionPlanCaseReportValidateService.findOneActionPlanCaseReportValidateByIdCase(idCase);
  }

  @Delete('/deleteActionPlanCaseReportValidate/:id')
  deleteActionPlanCaseReportValidate(@Param('id') id: number) {
    return this.actionPlanCaseReportValidateService.deleteActionPlanCaseReportValidate(id);
  }
}
