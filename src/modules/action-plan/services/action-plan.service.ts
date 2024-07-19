import { Injectable } from '@nestjs/common';
import { CreateActionPlanDto } from '../dto/create-action-plan.dto';
import { UpdateActionPlanDto } from '../dto/update-action-plan.dto';

@Injectable()
export class ActionPlanService {
  create(createActionPlanDto: CreateActionPlanDto) {
    return 'This action adds a new actionPlan';
  }

  findAll() {
    return `This action returns all actionPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actionPlan`;
  }

  update(id: number, updateActionPlanDto: UpdateActionPlanDto) {
    return `This action updates a #${id} actionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionPlan`;
  }
}
