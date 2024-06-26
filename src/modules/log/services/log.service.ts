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
    reporterId: number,
    clientIp: string,
    action: string,
  ): Promise<void> {
    const log = this.logRepository.create({
      log_validatedcase_id_fk: caseReportValidateId,
      log_user_id: reporterId,
      log_ip: clientIp,
      log_action: action,
    });

    await queryRunner.manager.save(log);
  }

  async createLog(
    caseReportValidateId: string,
    userId: number,
    clientIp: string,
    action: string,
  ): Promise<LogEntity> {
    const createLogDto: CreateLogDto = {
      log_validatedcase_id_fk: caseReportValidateId,
      log_user_id: userId,
      log_ip: clientIp,
      log_action: action,
    };

    const log = this.logRepository.create(createLogDto);
    return await this.logRepository.save(log);
  }

  async findAllLogs(): Promise<LogEntity[]> {
    const logs = await this.logRepository.find({
      relations: {
        caseReportValidate: true,
      },
    });

    if (logs.length === 0) {
      throw new HttpException(
        'No se encontró la lista de logs.',
        HttpStatus.NO_CONTENT,
      );
    }
    return logs;
  }

  async findOneLog(id: number): Promise<LogEntity> {
    const log = await this.logRepository.findOne({
      where: { id },
      relations: {
        caseReportValidate: true,
      },
    });

    if (!log) {
      throw new HttpException('No se encontró el log.', HttpStatus.NO_CONTENT);
    }

    return log;
  }

  async updateLog(id: number, updateLogDto: UpdateLogDto) {
    const log = await this.findOneLog(id);
    const result = await this.logRepository.update(log.id, updateLogDto);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el log`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
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
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
