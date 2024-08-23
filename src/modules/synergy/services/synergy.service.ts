import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { UpdateSynergyDto } from '../dto/update-synergy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Synergy as SynergyEntity } from '../entities/synergy.entity';
import { In, Repository } from 'typeorm';
import { CaseType as CaseTypeEntity } from 'src/modules/case-type/entities/case-type.entity';
import { caseTypeReport } from 'src/utils/enums/caseType-report.enum';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/utils/enums/logs.enum';
import { CaseReportValidate as CaseReportValidateEntity } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { movementReport } from 'src/utils/enums/movement-report.enum';
import { MovementReport as MovementReportEntity } from 'src/modules/movement-report/entities/movement-report.entity';
import { MovementReportService } from 'src/modules/movement-report/services/movement-report.service';

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
    idValidator: string,
  ) {
    const adverseEventType = await this.caseTypeRepository.findOne({
      where: {
        cas_t_name: caseTypeReport.ADVERSE_EVENT,
      },
    });

    if (!adverseEventType) {
      throw new HttpException(
        `Tipo de caso ${caseTypeReport.ADVERSE_EVENT} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    const synergyValidateCaseIds = createSynergy.map(
      (list) => list.syn_validatedcase_id_fk,
    );

    const existingCaseValidate = await this.caseReportValidateRepository.find({
      where: {
        id: In(synergyValidateCaseIds),
        val_cr_validated: false,
      },
    });

    if (existingCaseValidate.length !== synergyValidateCaseIds.length) {
      throw new HttpException(
        'No se encontró el reporte para algunos casos',
        HttpStatus.NOT_FOUND,
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // const movementReportFound =
    //   await this.movementReportService.findOneMovementReportByName(
    //     movementReport.CASE_RAISED_SYNERGY_COMMITTEE,
    //   );

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.CASE_RAISED_SYNERGY_COMMITTEE,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      return new HttpException(
        `El movimiento no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const invalidSynergyCodes = existingCaseValidate
      .filter(
        (caseType) => caseType.val_cr_casetype_id_fk !== adverseEventType.id,
      )
      .map((caseValidateCode) => caseValidateCode.val_cr_filingnumber);

    if (invalidSynergyCodes.length > 0) {
      throw new HttpException(
        {
          message: `Algunos reportes no coinciden con el tipo de caso ${caseTypeReport.ADVERSE_EVENT}`,
          data: invalidSynergyCodes,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const synergies = createSynergy.map((syn) => {
      return this.synergyRepository.create({
        ...syn,
        // syn_programmingcounter: 0,
        syn_evaluationdate: new Date(),
      });
    });

    const savedSynergies = await this.synergyRepository.save(synergies);

    for (const synergy of savedSynergies) {
      await this.logService.createLog(
        synergy.syn_validatedcase_id_fk,
        idValidator,
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

    return new HttpException(
      `¡Los casos se elevaron a sinergia correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllSynergy() {
    const synergies = await this.synergyRepository.find({
      relations: {
        caseReportValidate: true,
      },
      where: {
        syn_status: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (synergies.length === 0) {
      throw new HttpException(
        'No se encontró la lista de casos en sinergia',
        HttpStatus.NOT_FOUND,
      );
    }

    return synergies;
  }

  async findOneSynergy(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del caso en sinergia es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const synergy = await this.synergyRepository.findOne({
      where: { id, syn_status: false },
      relations: {
        caseReportValidate: true,
      },
    });

    if (!synergy) {
      throw new HttpException(
        'No se encontró el caso en sinergia',
        HttpStatus.NOT_FOUND,
      );
    }

    return synergy;
  }

  // async rescheduleSynergy(id: number, clientIp: string, idValidator: string) {
  //   if (!clientIp) {
  //     throw new HttpException(
  //       'La dirección IP del usuario es requerido.',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   if (!idValidator) {
  //     throw new HttpException(
  //       'El identificador del validador es requerido.',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const synergy = await this.findOneSynergy(id);

  //   const movementReportFound =
  //     await this.movementReportService.findOneMovementReportByName(
  //       movementReport.CASE_RESCHEDULED_SYNERGY,
  //     );

  //   const updateSynergy = await this.synergyRepository.update(synergy.id, {
  //     syn_reschedulingdate: new Date(),
  //     syn_programmingcounter: (synergy.syn_programmingcounter += 1),
  //   });

  //   if (updateSynergy.affected === 0) {
  //     throw new HttpException(
  //       `No se pudo reprogramar el caso.`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }

  //   await this.logService.createLog(
  //     synergy.syn_validatedcase_id_fk,
  //     idValidator,
  //     clientIp,
  //     logReports.LOG_CASE_RESCHEDULED_SYNERGY,
  //   );

  //   const updateStatusMovement = await this.caseReportValidateRepository.update(
  //     synergy.syn_validatedcase_id_fk,
  //     {
  //       val_cr_statusmovement_id_fk: movementReportFound.id,
  //     },
  //   );

  //   if (updateStatusMovement.affected === 0) {
  //     throw new HttpException(
  //       `No se pudo actualizar el moviemiento del reporte.`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }

  //   return new HttpException(
  //     `¡Caso reprogramado correctamente!`,
  //     HttpStatus.OK,
  //   );
  // }

  async resolutionSynergy(id: number, clientIp: string, idValidator: string) {
    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idValidator) {
      throw new HttpException(
        'El identificador del validador es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const synergy = await this.findOneSynergy(id);

    // const movementReportFound =
    //   await this.movementReportService.findOneMovementReportByName(
    //     movementReport.SOLUTION_CASE_SYNERGY,
    //   );

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementReport.SOLUTION_CASE_SYNERGY,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      return new HttpException(
        `El movimiento no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updateStatusSynergy = await this.synergyRepository.update(
      synergy.id,
      {
        syn_status: true,
      },
    );

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

    const resolutionDateSynergy = await this.synergyRepository.update(
      synergy.id,
      {
        syn_resolutiondate: new Date(),
        syn_status: true,
      },
    );

    if (resolutionDateSynergy.affected === 0) {
      throw new HttpException(
        `No se pudo resolver el caso.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      synergy.syn_validatedcase_id_fk,
      idValidator,
      clientIp,
      logReports.LOG_SOLUTION_CASE_SYNERGY,
    );

    return new HttpException(
      `¡Caso resuelto y registrado correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async deleteSynergy(id: number) {
    const synergyFound = await this.synergyRepository.findOneBy({ id });

    if (!synergyFound) {
      return new HttpException(
        `Sinergia no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.synergyRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el reporte en sinergia.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
