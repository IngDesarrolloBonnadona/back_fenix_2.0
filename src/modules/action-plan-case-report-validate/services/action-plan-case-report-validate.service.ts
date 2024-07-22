import { Injectable } from '@nestjs/common';
import { CreateActionPlanCaseReportValidateDto } from '../dto/create-action-plan-case-report-validate.dto';
import { UpdateActionPlanCaseReportValidateDto } from '../dto/update-action-plan-case-report-validate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { ActionPlanCaseReportValidate as ActionPlanCaseReportValidateEntity} from '../entities/action-plan-case-report-validate.entity';

@Injectable()
export class ActionPlanCaseReportValidateService {
  constructor(
    @InjectRepository(ActionPlanCaseReportValidateEntity)
    private readonly actionPlanCaseReportValidateRepository: Repository<ActionPlanCaseReportValidateEntity>,
  ) {}
  async createActionPlanCaseReportValidateTransaction(
    queryRunner: QueryRunner,
    actionPlanCaseReportValidate: CreateActionPlanCaseReportValidateDto,
  ) {
    const actionPlanCRV = this.actionPlanCaseReportValidateRepository.create(
      actionPlanCaseReportValidate
    )

    return await queryRunner.manager.save(actionPlanCRV);
  }

  findAll() {
    return `This action returns all actionPlanCaseReportValidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actionPlanCaseReportValidate`;
  }

  update(
    id: number,
    updateActionPlanCaseReportValidateDto: UpdateActionPlanCaseReportValidateDto,
  ) {
    return `This action updates a #${id} actionPlanCaseReportValidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionPlanCaseReportValidate`;
  }
}
