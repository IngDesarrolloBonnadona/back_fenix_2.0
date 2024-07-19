import { Injectable } from '@nestjs/common';
import { CreateActionPlanCaseReportValidateDto } from './dto/create-action-plan-case-report-validate.dto';
import { UpdateActionPlanCaseReportValidateDto } from './dto/update-action-plan-case-report-validate.dto';

@Injectable()
export class ActionPlanCaseReportValidateService {
  create(createActionPlanCaseReportValidateDto: CreateActionPlanCaseReportValidateDto) {
    return 'This action adds a new actionPlanCaseReportValidate';
  }

  findAll() {
    return `This action returns all actionPlanCaseReportValidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actionPlanCaseReportValidate`;
  }

  update(id: number, updateActionPlanCaseReportValidateDto: UpdateActionPlanCaseReportValidateDto) {
    return `This action updates a #${id} actionPlanCaseReportValidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionPlanCaseReportValidate`;
  }
}
