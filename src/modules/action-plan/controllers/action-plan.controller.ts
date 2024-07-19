import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActionPlanService } from '../services/action-plan.service';
import { CreateActionPlanDto } from '../dto/create-action-plan.dto';
import { UpdateActionPlanDto } from '../dto/update-action-plan.dto';

@Controller('action-plan')
export class ActionPlanController {
  constructor(private readonly actionPlanService: ActionPlanService) {}

  @Post()
  create(@Body() createActionPlanDto: CreateActionPlanDto) {
    return this.actionPlanService.create(createActionPlanDto);
  }

  @Get()
  findAll() {
    return this.actionPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionPlanDto: UpdateActionPlanDto) {
    return this.actionPlanService.update(+id, updateActionPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionPlanService.remove(+id);
  }
}
