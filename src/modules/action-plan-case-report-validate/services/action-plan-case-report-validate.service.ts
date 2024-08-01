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
    if (!idCase) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return actionPlanCRV;
  }

  async findOneActionPlanCaseReportValidate(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del plan de acción relacionado con el caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    const actionPlanCRV =
      await this.actionPlanCaseReportValidateRepository.findOne({
        where: { id, plan_av_status: true },
      });

    if (!actionPlanCRV) {
      throw new HttpException(
        'No se encontró el caso asignado en plan de acción.',
        HttpStatus.NOT_FOUND,
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
