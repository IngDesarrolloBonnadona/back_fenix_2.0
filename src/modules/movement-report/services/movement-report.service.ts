import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateMovementReportDto } from '../dto/create-movement-report.dto';
import { UpdateMovementReportDto } from '../dto/update-movement-report.dto';

import { MovementReport } from '../entities/movement-report.entity';

@Injectable()
export class MovementReportService {
  constructor(
    @InjectRepository(MovementReport)
    private readonly movementReportRepository: Repository<MovementReport>,
  ) {}

  async createMovementReport(createMovementReportDto: CreateMovementReportDto) {
    if (
      !createMovementReportDto ||
      !createMovementReportDto.mov_r_name ||
      !createMovementReportDto.mov_r_time
    ) {
      return new HttpException(
        'Algunos datos del movimiento de reporte es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const FindmovementReport = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: createMovementReportDto.mov_r_name,
        mov_r_status: true,
      },
    });

    if (FindmovementReport) {
      return new HttpException(
        'El movimiento de reporte ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const movementReport = this.movementReportRepository.create(
      createMovementReportDto,
    );
    await this.movementReportRepository.save(movementReport);

    return new HttpException(
      `¡El movimiviento de reportes ${movementReport.mov_r_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllMovementReports() {
    const movementReports = await this.movementReportRepository.find({
      where: {
        mov_r_status: true,
      },
      order: {
        mov_r_name: 'ASC',
      },
    });

    if (movementReports.length === 0) {
      return new HttpException(
        'No se encontró la lista de movimientos de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    return movementReports;
  }

  async findOneMovementReport(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del movimiento de reporte es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const movementReport = await this.movementReportRepository.findOne({
      where: { id, mov_r_status: true },
    });

    if (!movementReport) {
      return new HttpException(
        'No se encontró el movimiento de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    return movementReport;
  }

  async updateMovementReport(
    id: number,
    updateMovementReportDto: UpdateMovementReportDto,
  ) {
    if (!updateMovementReportDto) {
      return new HttpException(
        'Los datos para actualizar el movimiento de reporte son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneMovementReport(id);
    const result = await this.movementReportRepository.update(
      id,
      updateMovementReportDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el movimiento de reporte`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteMovementReport(id: number) {
    const movementReportFound = await this.movementReportRepository.findOneBy({
      id,
    });

    if (!movementReportFound) {
      return new HttpException(
        `Movimiento de reporte no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND
      )
    }

    const result = await this.movementReportRepository.softDelete(
      id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el movimiento de reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
