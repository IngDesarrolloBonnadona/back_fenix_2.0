import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateCompressionConceptReportDto } from '../dto/create-compression-concept-report.dto';

import { CompressionConceptReport } from '../entities/compression-concept-report.entity';

@Injectable()
export class CompressionConceptReportService {
  constructor(
    @InjectRepository(CompressionConceptReport)
    private readonly CompressionConceptReportRepository: Repository<CompressionConceptReport>,
  ) {}

  async createCompressionConceptReport(
    createCompressionConceptReportDto: CreateCompressionConceptReportDto,
  ) {
    if (
      !createCompressionConceptReportDto ||
      !createCompressionConceptReportDto.comp_c_casetype_id_fk ||
      !createCompressionConceptReportDto.comp_c_user_id
    ) {
      return new HttpException(
        'Algunos datos de comprension de conceptos del reporte son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const compressionConceptReport =
      this.CompressionConceptReportRepository.create(
        createCompressionConceptReportDto,
      );
    await this.CompressionConceptReportRepository.save(
      compressionConceptReport,
    );

    return new HttpException(
      `¡la compresion de los conceptos de reportes se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllCompressionConceptReports() {
    const compressionConceptReports =
      await this.CompressionConceptReportRepository.find({
        where: { comp_c_status: true },
        order: {
          createdAt: 'DESC',
        },
      });

    if (compressionConceptReports.length === 0) {
      return new HttpException(
        'No se encontró la lista de indicadores de compresion de los conceptos de reportes.',
        HttpStatus.NOT_FOUND,
      );
    }
    return compressionConceptReports;
  }

  async findOneCompressionConceptReport(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador de comprension de conceptos de reporte del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const compressionConceptReport =
      await this.CompressionConceptReportRepository.findOne({
        where: { id, comp_c_status: true },
      });

      if (!compressionConceptReport) {
        return new HttpException(
          'No se encontró el indicador de compresion de los conceptos de reportes.',
          HttpStatus.NOT_FOUND,
        );
      }
    return compressionConceptReport;
  }

}
