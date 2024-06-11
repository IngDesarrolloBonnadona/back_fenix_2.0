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

@Injectable()
export class SynergyService {
  constructor(
    @InjectRepository(SynergyEntity)
    private readonly synergyRepository: Repository<SynergyEntity>,
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository: Repository<CaseTypeEntity>,

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
        HttpStatus.NOT_FOUND,
      );
    }

    const synValidateCaseIds = createSynergy.map(
      (dto) => dto.syn_validatedcase_id_fk,
    );

    const existingSynergies = await this.synergyRepository.find({
      where: {
        syn_validatedcase_id_fk: In(synValidateCaseIds),
      },
    });

    if (existingSynergies.length > 0) {
      throw new HttpException(
        'Algunos casos ya fueron elevados a comité de sinergia',
        HttpStatus.CONFLICT,
      );
    }

    const invalidSynergyIds = createSynergy
      .filter((dto) => dto.caseType_id !== adverseEventType.id)
      .map((dto) => dto.syn_validatedcase_id_fk);

    if (invalidSynergyIds.length > 0) {
      return {
        message: `Algunos tipos de caso no coinciden con el tipo de caso ${caseTypeReport.ADVERSE_EVENT}`,
        invalidSynergyIds,
      };
    }

    const synergies = createSynergy.map((dto) => {
      return this.synergyRepository.create({
        ...dto,
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

    return savedSynergies;
  }

  async findAllSynergy() {
    const synergies = await this.synergyRepository.find({
      relations: {
        caseReportValidate: true,
      },
      where: {
        syn_status: false,
      },
    });

    if (!synergies || synergies.length === 0) {
      throw new HttpException(
        'No se encontró la lista de casos en sinergia',
        HttpStatus.NOT_FOUND,
      );
    }

    return synergies;
  }

  async findOneSynergy(id: number) {
    const synergy = await this.synergyRepository.findOne({
      where: { id, syn_status: false },
    });

    if (!synergy) {
      throw new HttpException(
        'No se encontró el caso en sinergia',
        HttpStatus.NOT_FOUND,
      );
    }

    return synergy;
  }

  async rescheduleSynergy(id: number, clientIp: string, idValidator: number) {
    const synergy = await this.findOneSynergy(id);

    synergy.syn_reschedulingdate = new Date();
    synergy.syn_programmingcounter += 1;

    await this.synergyRepository.save(synergy);

    await this.logService.createLog(
      synergy.syn_validatedcase_id_fk,
      idValidator,
      clientIp,
      logReports.LOG_CASE_RESCHEDULED_SYNERGY,
    );

    return new HttpException(
      `¡Caso reprogramado correctamente!`,
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
