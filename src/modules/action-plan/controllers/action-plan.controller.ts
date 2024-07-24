import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Query,
} from '@nestjs/common';
import { ActionPlanService } from '../services/action-plan.service';
import { CreateActionPlanDto } from '../dto/create-action-plan.dto';
import { UpdateActionPlanDto } from '../dto/update-action-plan.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActionPlan } from '../entities/action-plan.entity';

@ApiTags('action-plan')
@Controller('action-plan')
export class ActionPlanController {
  constructor(private readonly actionPlanService: ActionPlanService) {}

  @Post('/createActionPlan/:idCaseValidate')
  createActionPlan(
    @Body() createActionPlanDto: CreateActionPlanDto,
    @Param('idCaseValidate') idCaseValidate: string,
  ): Promise<HttpException> {
    return this.actionPlanService.createActionPlan(
      createActionPlanDto,
      idCaseValidate,
    );
  }

  @Get('/summaryActionPlan/')
  summaryActionPlan(
    @Query('actionPlanName') actionPlanName?: string,
    @Query('eventTypeId') eventTypeId?: number,
    @Query('eventId') eventId?: number,
  ): Promise<ActionPlan[]> {
    return this.actionPlanService.summaryActionPlan(
      actionPlanName,
      eventTypeId,
      eventId
    );
  }

  @Get('/findOneActionPlan/:id')
  findOneActionPlan(@Param('id') id: number) {
    return this.actionPlanService.findOneActionPlan(id);
  }
}
