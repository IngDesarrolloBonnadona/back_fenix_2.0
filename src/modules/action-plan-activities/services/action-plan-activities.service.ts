import { Injectable } from '@nestjs/common';
import { CreateActionPlanActivityDto } from '../dto/create-action-plan-activity.dto';
import { UpdateActionPlanActivityDto } from '../dto/update-action-plan-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionPlanActivity as ActionPlanActivityEntity } from '../entities/action-plan-activity.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class ActionPlanActivitiesService {
  constructor(
    @InjectRepository(ActionPlanActivityEntity)
    private readonly actionPlanActivityRepository: Repository<ActionPlanActivityEntity>,
  ) {}
  async createActionPlanActivityTransaction(
    actionPlanActivities: CreateActionPlanActivityDto[],
    actionPlanId: number,
    queryRunner: QueryRunner,
  ) {
    for (const actionPlanActivity of actionPlanActivities) {
      const actionPA = this.actionPlanActivityRepository.create({
        ...actionPlanActivity,
        plan_aa_actionplan_id_fk: actionPlanId,
      });
      
      await queryRunner.manager.save(actionPA);
    }

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
