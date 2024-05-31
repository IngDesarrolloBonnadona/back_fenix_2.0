import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnalystReporterDto } from '../dto/create-analyst-reporter.dto';
import { UpdateAnalystReporterDto } from '../dto/update-analyst-reporter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalystReporter as AnalystReporterEntity } from '../entities/analyst-reporter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalystReporterService {
  constructor(
    @InjectRepository(AnalystReporterEntity)
    private readonly analystReporterRepository: Repository<AnalystReporterEntity>,
  ) {}

  async AssingAnalyst(createAnalystReporterDto: CreateAnalystReporterDto) {
    const analyst = this.analystReporterRepository.create(
      createAnalystReporterDto,
    );
    return await this.analystReporterRepository.save(analyst);
  }

  async findAllAnalystReporter() {
    const analystReporters = await this.analystReporterRepository.find({
      relations: {
        caseReportValidate: true,
        position: true
      }
    });

    if (!analystReporters) {
      throw new HttpException(
        'No se encontró la lista de analistas',
        HttpStatus.NOT_FOUND,
      );
    }

    return analystReporters;
  }

  async findOneAnalystReporter(id: number) {
    const analystReporter = await this.analystReporterRepository.findOne({
      where: { id },
    });

    if (!analystReporter) {
      throw new HttpException(
        'No se encontró el analista',
        HttpStatus.NOT_FOUND,
      );
    }
    return analystReporter;
  }

  async updateAnalystReporter(
    id: number,
    updateAnalystReporterDto: UpdateAnalystReporterDto,
  ) {
    const analystReporter = await this.findOneAnalystReporter(id);
    const result = await this.analystReporterRepository.update(
      analystReporter.id,
      updateAnalystReporterDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el cargo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteAnalystReporter(id: number) {
    const analystReporter = await this.findOneAnalystReporter(id);
    const result = await this.analystReporterRepository.softDelete(
      analystReporter.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el analista`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
