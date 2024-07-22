import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActionPlanActivitiesService } from '../services/action-plan-activities.service';
import { CreateActionPlanActivityDto } from '../dto/create-action-plan-activity.dto';
import { UpdateActionPlanActivityDto } from '../dto/update-action-plan-activity.dto';

@Controller('action-plan-activities')
export class ActionPlanActivitiesController {
  constructor(private readonly actionPlanActivitiesService: ActionPlanActivitiesService) {}

  // @Post()
  // create(@Body() createActionPlanActivityDto: CreateActionPlanActivityDto) {
  //   return this.actionPlanActivitiesService.create(createActionPlanActivityDto);
  // }

  @Get()
  findAll() {
    return this.actionPlanActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionPlanActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionPlanActivityDto: UpdateActionPlanActivityDto) {
    return this.actionPlanActivitiesService.update(+id, updateActionPlanActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionPlanActivitiesService.remove(+id);
  }
}
