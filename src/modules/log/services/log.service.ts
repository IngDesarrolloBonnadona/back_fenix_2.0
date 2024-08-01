import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLogDto } from '../dto/create-log.dto';
import { UpdateLogDto } from '../dto/update-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Log as LogEntity } from '../entities/log.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
  ) {}

  async createLogTransaction(
    queryRunner: QueryRunner,
    caseReportValidateId: string,
    reporterId: string,
    clientIp: string,
    action: string,
  ) {
    const createLogDto: CreateLogDto = {
      log_validatedcase_id_fk: caseReportValidateId,
      log_user_id: reporterId,
      log_ip: clientIp,
      log_action: action,
    };

    if (
      !createLogDto ||
      !createLogDto.log_action ||
      !createLogDto.log_ip ||
      !createLogDto.log_user_id ||
      !createLogDto.log_validatedcase_id_fk
    ) {
      throw new HttpException(
        'Algunos datos del log son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const log = this.logRepository.create(createLogDto);
    await queryRunner.manager.save(log);
  }

  async createLog(
    caseReportValidateId: string,
    userId: string,
    clientIp: string,
    action: string,
  ) {
    const createLogDto: CreateLogDto = {
      log_validatedcase_id_fk: caseReportValidateId,
      log_user_id: userId,
      log_ip: clientIp,
      log_action: action,
    };

    if (
      !createLogDto ||
      !createLogDto.log_action ||
      !createLogDto.log_ip ||
      !createLogDto.log_user_id ||
      !createLogDto.log_validatedcase_id_fk
    ) {
      throw new HttpException(
        'Algunos datos del log son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const log = this.logRepository.create(createLogDto);
    await this.logRepository.save(log);

    return new HttpException(
      `¡El log se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllLogs() {
    const logs = await this.logRepository.find({
      relations: {
        caseReportValidate: true,
      },
    });

    if (logs.length === 0) {
      throw new HttpException(
        'No se encontró la lista de logs.',
        HttpStatus.NOT_FOUND,
      );
    }
    return logs;
  }

  async findOneLog(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del log es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const log = await this.logRepository.findOne({
      where: { id },
      relations: {
        caseReportValidate: true,
      },
    });

    if (!log) {
      throw new HttpException('No se encontró el log.', HttpStatus.NOT_FOUND);
    }

    return log;
  }

  async deleteLog(id: number) {
    const log = await this.findOneLog(id);
    const result = await this.logRepository.softDelete(log.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el log`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
