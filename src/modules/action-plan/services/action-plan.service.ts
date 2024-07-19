import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActionPlanDto } from '../dto/create-action-plan.dto';
import { UpdateActionPlanDto } from '../dto/update-action-plan.dto';
import { ActionPlan as ActionPlanEntity } from '../entities/action-plan.entity';
import { DataSource, Repository } from 'typeorm';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { CaseTypeService } from 'src/modules/case-type/services/case-type.service';
import { EventTypeService } from 'src/modules/event-type/services/event-type.service';
import { EventService } from 'src/modules/event/services/event.service';
import { ServiceService } from 'src/modules/service/services/service.service';
import { UnitService } from 'src/modules/unit/services/unit.service';
import { PriorityService } from 'src/modules/priority/services/priority.service';
import { PositionService } from 'src/modules/position/services/position.service';

@Injectable()
export class ActionPlanService {
  constructor(
    @InjectRepository(ActionPlanEntity)
    private readonly actionPlanRepository: Repository<ActionPlanEntity>,

    private dataSource: DataSource,
    private readonly caseReportValidateService: CaseReportValidateService,
    private readonly caseTypeService: CaseTypeService,
    private readonly eventTypeService: EventTypeService,
    private readonly eventService: EventService,
    private readonly serviceService: ServiceService,
    private readonly unitService: UnitService,
    private readonly priorityService: PriorityService,
    private readonly prositionService: PositionService,
  ) {}
  async createActionPlan(
    createActionPlanDto: CreateActionPlanDto,
    idCaseValidate: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.caseTypeService.findOneCaseType(
        createActionPlanDto.plan_a_casetype_id_fk,
      );

      await this.eventTypeService.findOneEventType(
        createActionPlanDto.plan_a_eventtype_id_fk,
      );

      await this.eventService.findOneEvent(
        createActionPlanDto.plan_a_event_id_fk,
      );

      await this.serviceService.findOneService(
        createActionPlanDto.plan_a_service_id_fk,
      );

      await this.unitService.findOneUnit(createActionPlanDto.plan_a_unit_id_fk);

      await this.priorityService.findOnePriority(
        createActionPlanDto.plan_a_priority_id_fk,
      );

      

      await queryRunner.commitTransaction();
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(
        `Un error a ocurrido: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  findAllActionPlans() {
    return `This action returns all actionPlan`;
  }

  findOneActionPlan(id: number) {
    return `This action returns a #${id} actionPlan`;
  }

  updateActionPlan(id: number, updateActionPlanDto: UpdateActionPlanDto) {
    return `This action updates a #${id} actionPlan`;
  }

  deleteActionPlan(id: number) {
    return `This action removes a #${id} actionPlan`;
  }
}
