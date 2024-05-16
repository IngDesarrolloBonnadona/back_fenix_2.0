import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLogDto } from '../dto/create-log.dto';
import { UpdateLogDto } from '../dto/update-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Log as LogEntity } from '../entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>
  ){}

  async createLog(createLogDto: CreateLogDto) {
    const log = this.logRepository.create(createLogDto);
    return await this.logRepository.save(log)
  }

  async findAllLogs() {
    const logs = await this.logRepository.find({
      relations: {
        caseReportValidate: true,
      }
    })

    if (!logs) {
      throw new HttpException(
        'No se encontró la lista de logs.',
        HttpStatus.NOT_FOUND,
      );
    }
    return logs;
  }

  async findOneLog(id: number) {
    const log = await this.logRepository.findOne({ where: { id } });

    if (!log) {
      throw new HttpException(
        'No se encontró el log.',
        HttpStatus.NOT_FOUND,
      );
    }

    return log;
  }

  async updateLog(id: number, updateLogDto: UpdateLogDto) {
    const log = await this.findOneLog(id);
    
    Object.assign(log, updateLogDto)

    log.updateAt = new Date();

    return await this.logRepository.save(log);
  }

  async deleteLog(id: number) {
    const log = await this.findOneLog(id);
    const result = await this.logRepository.softDelete(log.id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el log`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }   
    return { message: `¡Datos eliminados correctamente!`}
  }
}
