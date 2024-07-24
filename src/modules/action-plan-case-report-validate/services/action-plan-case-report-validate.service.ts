import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActionPlanCaseReportValidateDto } from '../dto/create-action-plan-case-report-validate.dto';
import { UpdateActionPlanCaseReportValidateDto } from '../dto/update-action-plan-case-report-validate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { ActionPlanCaseReportValidate as ActionPlanCaseReportValidateEntity } from '../entities/action-plan-case-report-validate.entity';

@Injectable()
export class ActionPlanCaseReportValidateService {
  constructor(
    @InjectRepository(ActionPlanCaseReportValidateEntity)
    private readonly actionPlanCaseReportValidateRepository: Repository<ActionPlanCaseReportValidateEntity>,
  ) {}
  async createActionPlanCaseReportValidateTransaction(
    queryRunner: QueryRunner,
    actionPlanCaseReportValidate: CreateActionPlanCaseReportValidateDto,
  ) {
    const actionPlanCRV = this.actionPlanCaseReportValidateRepository.create(
      actionPlanCaseReportValidate,
    );

    return await queryRunner.manager.save(actionPlanCRV);
  }

  async findOneActionPlanCaseReportValidateByIdCase(idCase: string) {
    const actionPlanCRV =
      await this.actionPlanCaseReportValidateRepository.findOne({
        where: {
          plan_av_validatedcase_id_fk: idCase,
          plan_av_status: true,
        },
      });

    if (actionPlanCRV) {
      throw new HttpException(
        'El caso ya se encuentra en investigación.',
        HttpStatus.CONFLICT,
      );
    }

    return actionPlanCRV;
  }

  async findOneActionPlanCaseReportValidate(id: number) {
    const actionPlanCRV =
      await this.actionPlanCaseReportValidateRepository.findOne({
        where: { id, plan_av_status: true },
      });

    if (!actionPlanCRV) {
      throw new HttpException(
        'No se encontró el caso asignado en plan de acción.',
        HttpStatus.NO_CONTENT,
      );
    }
    return actionPlanCRV;
  }

  async deleteActionPlanCaseReportValidate(id: number) {
    const actionPlanCRV = await this.findOneActionPlanCaseReportValidate(id);
    const result = await this.actionPlanCaseReportValidateRepository.softDelete(
      actionPlanCRV.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el caso asignado en plan de acción.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
