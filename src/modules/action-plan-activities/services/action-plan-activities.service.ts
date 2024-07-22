import { Injectable } from '@nestjs/common';
import { CreateActionPlanActivityDto } from '../dto/create-action-plan-activity.dto';
import { UpdateActionPlanActivityDto } from '../dto/update-action-plan-activity.dto';

@Injectable()
export class ActionPlanActivitiesService {
  create(createActionPlanActivityDto: CreateActionPlanActivityDto) {
    return 'This action adds a new actionPlanActivity';
  }

  findAll() {
    return `This action returns all actionPlanActivities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actionPlanActivity`;
  }

  update(id: number, updateActionPlanActivityDto: UpdateActionPlanActivityDto) {
    return `This action updates a #${id} actionPlanActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionPlanActivity`;
  }
}
