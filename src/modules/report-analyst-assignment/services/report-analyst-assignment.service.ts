import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportAnalystAssignmentDto } from '../dto/create-report-analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportAnalystAssignment as ReportAnalystAssignmentEntity } from '../entities/report-analyst-assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportAnalystAssignmentService {
  constructor(
    @InjectRepository(ReportAnalystAssignmentEntity)
    private readonly analystReporterRepository: Repository<ReportAnalystAssignmentEntity>,
  ) {}

  async AssingAnalyst(
    createAnalystReporterDto: CreateReportAnalystAssignmentDto,
  ) {
    const reportFind = await this.analystReporterRepository.findOne({
      where: {
        ass_ra_validatedcase_id_fk: createAnalystReporterDto.ass_ra_validatedcase_id_fk
      }})

      if (reportFind) {
        throw new HttpException(
          'El reporte ya tiene un analista asignado',
          HttpStatus.CONFLICT,
        );
      }

    const analyst = this.analystReporterRepository.create(
      createAnalystReporterDto,
    );
    return await this.analystReporterRepository.save(analyst);
  }

  async findAllAnalystReporter() {
    const analystReporters = await this.analystReporterRepository.find({
      relations: {
        caseReportValidate: true,
        position: true,
      },
    });

    if (!analystReporters || analystReporters.length === 0) {
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
    updateAnalystReporterDto: UpdateReportAnalystAssignmentDto,
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
