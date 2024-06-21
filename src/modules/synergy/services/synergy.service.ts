import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { UpdateSynergyDto } from '../dto/update-synergy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Synergy as SynergyEntity } from '../entities/synergy.entity';
import { In, Repository } from 'typeorm';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { caseTypeReport } from 'src/enums/caseType-report.enum';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/enums/logs.enum';
import { CaseReportValidate as CaseReportValidateEntity } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { movementReport } from 'src/enums/movement-report.enum';
import { MovementReport as MovementReportEntity } from 'src/modules/movement-report/entities/movement-report.entity';

@Injectable()
export class SynergyService {
  constructor(
    @InjectRepository(SynergyEntity)
    private readonly synergyRepository: Repository<SynergyEntity>,
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository: Repository<CaseTypeEntity>,
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,

    private readonly logService: LogService,
  ) {}

  async createSynergy(
    createSynergy: CreateSynergyDto[],
    clientIp: string,
    idAnalyst: number,
  ) {
    const adverseEventType = await this.caseTypeRepository.findOne({
      where: {
        cas_t_name: caseTypeReport.ADVERSE_EVENT,
      },
    });

    if (!adverseEventType) {
      throw new HttpException(
        `Tipo de caso ${caseTypeReport.ADVERSE_EVENT} no encontrado`,
        HttpStatus.NO_CONTENT,
      );
    }

    const synergyValidateCaseIds = createSynergy.map(
      (list) => list.syn_validatedcase_id_fk,
    );

    const existingCaseValidate = await this.caseReportValidateRepository.find({
      where: {
        id: In(synergyValidateCaseIds),
      },
    });

    if (existingCaseValidate.length !== synergyValidateCaseIds.length) {
      throw new HttpException(
        'No se encontró el reporte para algunos casos',
        HttpStatus.CONFLICT,
      );
    }

    const existingSynergies = await this.synergyRepository.find({
      where: {
        syn_validatedcase_id_fk: In(synergyValidateCaseIds),
      },
    });

    if (existingSynergies.length > 0) {
      throw new HttpException(
        'Algunos casos ya fueron elevados a comité de sinergia',
        HttpStatus.CONFLICT,
      );
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.CASE_RAISED_SYNERGY_COMMITTEE,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(
        `El movimiento ${movementReport.CASE_RAISED_SYNERGY_COMMITTEE} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const invalidSynergyIds = existingCaseValidate
      .filter(
        (caseType) => caseType.val_cr_casetype_id_fk !== adverseEventType.id,
      )
      .map((caseValidateId) => caseValidateId.id);

    if (invalidSynergyIds.length > 0) {
      return {
        message: `Algunos tipos de caso no coinciden con el tipo de caso ${caseTypeReport.ADVERSE_EVENT}`,
        invalidSynergyIds,
      };
    }

    const synergies = createSynergy.map((syn) => {
      return this.synergyRepository.create({
        ...syn,
        syn_programmingcounter: 0,
        syn_evaluationdate: new Date(),
      });
    });

    const savedSynergies = await this.synergyRepository.save(synergies);

    for (const synergy of savedSynergies) {
      await this.logService.createLog(
        synergy.syn_validatedcase_id_fk,
        idAnalyst,
        clientIp,
        logReports.LOG_CASE_RAISED_SYNERGY_COMMITTEE,
      );
    }

    for (const synergy of savedSynergies) {
      const updateStatusMovement =
        await this.caseReportValidateRepository.update(
          synergy.syn_validatedcase_id_fk,
          {
            val_cr_statusmovement_id_fk: movementReportFound.id,
          },
        );

      if (updateStatusMovement.affected === 0) {
        throw new HttpException(
          `No se pudo actualizar el moviemiento del reporte.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return savedSynergies;
  }

  async findAllSynergy(): Promise<SynergyEntity[]> {
    const synergies = await this.synergyRepository.find({
      relations: {
        caseReportValidate: true,
      },
      where: {
        syn_status: false,
      },
    });

    if (synergies.length === 0) {
      throw new HttpException(
        'No se encontró la lista de casos en sinergia',
        HttpStatus.NO_CONTENT,
      );
    }

    return synergies;
  }

  async findOneSynergy(id: number): Promise<SynergyEntity> {
    const synergy = await this.synergyRepository.findOne({
      where: { id, syn_status: false },
      relations: {
        caseReportValidate: true,
      },
    });

    if (!synergy) {
      throw new HttpException(
        'No se encontró el caso en sinergia',
        HttpStatus.NO_CONTENT,
      );
    }

    return synergy;
  }

  async rescheduleSynergy(id: number, clientIp: string, idValidator: number) {
    const synergy = await this.findOneSynergy(id);

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.CASE_RESCHEDULED_SYNERGY,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(
        `El movimiento ${movementReport.CASE_RESCHEDULED_SYNERGY} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const updateSynergy = await this.synergyRepository.update(synergy.id, {
      syn_reschedulingdate: new Date(),
      syn_programmingcounter: (synergy.syn_programmingcounter += 1),
    });

    if (updateSynergy.affected === 0) {
      throw new HttpException(
        `No se pudo reprogramar el caso.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      synergy.syn_validatedcase_id_fk,
      idValidator,
      clientIp,
      logReports.LOG_CASE_RESCHEDULED_SYNERGY,
    );

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      synergy.syn_validatedcase_id_fk,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Caso reprogramado correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async resolutionSynergy(id: number, clientIp: string, idValidator: number) {
    const synergy = await this.findOneSynergy(id);

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.SOLUTION_CASE_SYNERGY,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(
        `El movimiento ${movementReport.SOLUTION_CASE_SYNERGY} no existe.`,
        HttpStatus.NO_CONTENT,
      );
    }

    const updateStatusSynergy = await this.synergyRepository.update(synergy.id, {
      syn_status: true,
    });

    if (updateStatusSynergy.affected === 0) {
      throw new HttpException(
        `No se pudo reprogramar el caso.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      synergy.syn_validatedcase_id_fk,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const newSynergy = this.synergyRepository.create({
      syn_validatedcase_id_fk: synergy.syn_validatedcase_id_fk,
      syn_programmingcounter: synergy.syn_programmingcounter,
      syn_reschedulingdate: synergy.syn_reschedulingdate,
      syn_evaluationdate: synergy.syn_evaluationdate,
      syn_resolutiondate: new Date(),
      syn_status: true,
    });

    await this.synergyRepository.save(newSynergy);

    await this.logService.createLog(
      synergy.syn_validatedcase_id_fk,
      idValidator,
      clientIp,
      logReports.LOG_SOLUTION_CASE_SYNERGY,
    );

    return new HttpException(
      `¡Caso resuelto y registrado correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteSynergy(id: number) {
    const synergy = await this.findOneSynergy(id);
    const result = await this.synergyRepository.softDelete(synergy.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el reporte en sinergia.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
