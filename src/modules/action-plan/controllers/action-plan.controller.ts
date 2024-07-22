import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActionPlanService } from '../services/action-plan.service';
import { CreateActionPlanDto } from '../dto/create-action-plan.dto';
import { UpdateActionPlanDto } from '../dto/update-action-plan.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('action-plan')
@Controller('action-plan')
export class ActionPlanController {
  constructor(private readonly actionPlanService: ActionPlanService) {}

  @Post('/createActionPlan/:idCaseValidate')
  createActionPlan(
    @Body() createActionPlanDto: CreateActionPlanDto,
    @Param('idCaseValidate') idCaseValidate: string,
  ) {
    return this.actionPlanService.createActionPlan(
      createActionPlanDto,
      idCaseValidate,
    );
  }

  @Get('/listActionPlan/')
  listActionPlan() {
    return this.actionPlanService.findAllActionPlans();
  }

  @Get('/findActionPlan/:id')
  findActionPlan(@Param('id') id: number) {
    return this.actionPlanService.findOneActionPlan(id);
  }

  @Patch('updateActionPlan/:id/')
  updateActionPlan(
    @Param('id') id: number,
    @Body() updateActionPlanDto: UpdateActionPlanDto,
  ) {
    return this.actionPlanService.updateActionPlan(id, updateActionPlanDto);
  }

  @Delete('/deleteActionPlan/:id')
  deleteActionPlan(@Param('id') id: number) {
    return this.actionPlanService.deleteActionPlan(id);
  }
}
