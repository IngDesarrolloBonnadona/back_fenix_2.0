import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActionPlanDto } from '../dto/create-action-plan.dto';
import { ActionPlan } from '../entities/action-plan.entity';
import { DataSource, FindOptionsWhere, Like, Repository } from 'typeorm';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { CaseTypeService } from 'src/modules/case-type/services/case-type.service';
import { EventTypeService } from 'src/modules/event-type/services/event-type.service';
import { EventService } from 'src/modules/event/services/event.service';
import { ServiceService } from 'src/modules/service/services/service.service';
import { UnitService } from 'src/modules/unit/services/unit.service';
import { PriorityService } from 'src/modules/priority/services/priority.service';
import { PositionService } from 'src/modules/position/services/position.service';
import { ActionPlanActivitiesService } from 'src/modules/action-plan-activities/services/action-plan-activities.service';

@Injectable()
export class ActionPlanService {
  constructor(
    @InjectRepository(ActionPlan)
    private readonly actionPlanRepository: Repository<ActionPlan>,

    private dataSource: DataSource,
    private readonly caseReportValidateService: CaseReportValidateService,
    private readonly caseTypeService: CaseTypeService,
    private readonly eventTypeService: EventTypeService,
    private readonly eventService: EventService,
    private readonly serviceService: ServiceService,
    private readonly unitService: UnitService,
    private readonly priorityService: PriorityService,
    private readonly prositionService: PositionService,
    private readonly actionPlanActivityService: ActionPlanActivitiesService,
  ) {}
  async createActionPlan(createActionPlanDto: CreateActionPlanDto) {
    await Promise.all([
      this.caseTypeService.findOneCaseType(
        createActionPlanDto.plan_a_casetype_id_fk,
      ),
      this.eventTypeService.findOneEventType(
        createActionPlanDto.plan_a_eventtype_id_fk,
      ),
      this.eventService.findOneEvent(createActionPlanDto.plan_a_event_id_fk),
      this.serviceService.findOneService(
        createActionPlanDto.plan_a_service_id_fk,
      ),
      this.unitService.findOneUnit(createActionPlanDto.plan_a_unit_id_fk),
      this.priorityService.findOnePriority(
        createActionPlanDto.plan_a_priority_id_fk,
      ),
      this.prositionService.findOnePosition(
        createActionPlanDto.plan_a_position_id_fk,
      ),
    ]);

    const actionPlanExist = await this.actionPlanRepository.findOne({
      where: {
        plan_a_name: createActionPlanDto.plan_a_name,
        plan_a_status: true,
      },
    });

    if (actionPlanExist) {
      throw new HttpException(
        `El plan de acción ya existe.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const actionPlan = this.actionPlanRepository.create(createActionPlanDto);
    await this.actionPlanRepository.save(actionPlan);

    await this.actionPlanActivityService.createActionPlanActivity(
      createActionPlanDto.actionPlanActivity,
      actionPlan.id,
    );

    return new HttpException(
      `¡Has creado el plan de acción exitosamente.!`,
      HttpStatus.CREATED,
    );
  }

  async summaryActionPlan(
    actionPlanName?: string,
    eventTypeId?: number,
    eventId?: number,
  ) {
    const where: FindOptionsWhere<ActionPlan> = {};

    if (actionPlanName) {
      where.plan_a_name = Like(`%${actionPlanName}%`);
    }

    if (eventTypeId) {
      where.plan_a_eventtype_id_fk = eventTypeId;
    }

    if (eventId) {
      where.plan_a_event_id_fk = eventId;
    }

    where.plan_a_status = true;

    const actionPlan = await this.actionPlanRepository.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });

    if (actionPlan.length === 0) {
      throw new HttpException(
        'No hay planes de acción para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }
    return actionPlan;
  }

  async findAllActionPlan() {
    const actionPlans = await this.actionPlanRepository.find({
      where: { plan_a_status: true },
      order: { plan_a_name: 'ASC' },
    });

    if (actionPlans.length === 0) {
      throw new HttpException(
        'No se encontró la lista de planes de acción.',
        HttpStatus.NOT_FOUND,
      );
    }

    return actionPlans;
  }

  async findOneActionPlan(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del plan de acción es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const actionPlan = await this.actionPlanRepository.findOne({
      where: { id, plan_a_status: true },
      relations: { actionPlanActivity: true },
    });

    if (!actionPlan) {
      throw new HttpException(
        'No se encontró el plan de acción.',
        HttpStatus.NOT_FOUND,
      );
    }
    return actionPlan;
  }

  async deleteActionPlan(id: number) {
    const actionPlan = await this.findOneActionPlan(id);
    const result = await this.actionPlanRepository.softDelete(actionPlan.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el plan de acción.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
