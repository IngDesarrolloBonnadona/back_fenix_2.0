import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActionPlanCaseReportValidateService } from '../services/action-plan-case-report-validate.service';
import { CreateActionPlanCaseReportValidateDto } from '../dto/create-action-plan-case-report-validate.dto';
import { UpdateActionPlanCaseReportValidateDto } from '../dto/update-action-plan-case-report-validate.dto';

@Controller('action-plan-case-report-validate')
export class ActionPlanCaseReportValidateController {
  constructor(private readonly actionPlanCaseReportValidateService: ActionPlanCaseReportValidateService) {}

  @Post()
  create(@Body() createActionPlanCaseReportValidateDto: CreateActionPlanCaseReportValidateDto) {
    return this.actionPlanCaseReportValidateService.create(createActionPlanCaseReportValidateDto);
  }

  @Get()
  findAll() {
    return this.actionPlanCaseReportValidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionPlanCaseReportValidateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionPlanCaseReportValidateDto: UpdateActionPlanCaseReportValidateDto) {
    return this.actionPlanCaseReportValidateService.update(+id, updateActionPlanCaseReportValidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionPlanCaseReportValidateService.remove(+id);
  }
}
