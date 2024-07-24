import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActionPlanDto } from '../dto/create-action-plan.dto';
import { UpdateActionPlanDto } from '../dto/update-action-plan.dto';
import { ActionPlan as ActionPlanEntity } from '../entities/action-plan.entity';
import { DataSource, FindOptionsWhere, Like, Repository } from 'typeorm';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { CaseTypeService } from 'src/modules/case-type/services/case-type.service';
import { EventTypeService } from 'src/modules/event-type/services/event-type.service';
import { EventService } from 'src/modules/event/services/event.service';
import { ServiceService } from 'src/modules/service/services/service.service';
import { UnitService } from 'src/modules/unit/services/unit.service';
import { PriorityService } from 'src/modules/priority/services/priority.service';
import { PositionService } from 'src/modules/position/services/position.service';
import { ActionPlanCaseReportValidateService } from 'src/modules/action-plan-case-report-validate/services/action-plan-case-report-validate.service';
import { CreateActionPlanCaseReportValidateDto } from 'src/modules/action-plan-case-report-validate/dto/create-action-plan-case-report-validate.dto';
import { ActionPlanActivitiesService } from 'src/modules/action-plan-activities/services/action-plan-activities.service';

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
    private readonly actionPlanCaseReportValidateService: ActionPlanCaseReportValidateService,
    private readonly actionPlanActivityService: ActionPlanActivitiesService,
  ) {}
  async createActionPlan(
    createActionPlanDto: CreateActionPlanDto,
    idCaseValidate: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
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
        this.caseReportValidateService.findOneReportValidate(idCaseValidate),
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
          HttpStatus.NO_CONTENT,
        );
      }

      await this.actionPlanCaseReportValidateService.findOneActionPlanCaseReportValidateByIdCase(
        idCaseValidate,
      );

      const actionPlan = this.actionPlanRepository.create(createActionPlanDto);
      await queryRunner.manager.save(actionPlan);

      const actionPlanRCV: CreateActionPlanCaseReportValidateDto = {
        plan_av_actionplan_id_fk: actionPlan.id,
        plan_av_validatedcase_id_fk: idCaseValidate,
      };

      await this.actionPlanCaseReportValidateService.createActionPlanCaseReportValidateTransaction(
        queryRunner,
        actionPlanRCV,
      );

      await this.actionPlanActivityService.createActionPlanActivityTransaction(
        createActionPlanDto.actionPlanActivity,
        actionPlan.id,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return new HttpException(
        `¡Has creado el plan de acción exitosamente.!`,
        HttpStatus.CREATED,
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async summaryActionPlan(
    actionPlanName?: string,
    eventTypeId?: number,
    eventId?: number,
  ) {
    const where: FindOptionsWhere<ActionPlanEntity> = {};

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
        HttpStatus.NO_CONTENT,
      );
    }
    return actionPlan;
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
