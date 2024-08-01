import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovementReportDto } from '../dto/create-movement-report.dto';
import { UpdateMovementReportDto } from '../dto/update-movement-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementReport as MovementReportEntity } from '../entities/movement-report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovementReportService {
  constructor(
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,
  ) {}

  async createMovementReport(createMovementReportDto: CreateMovementReportDto) {
    if (
      !createMovementReportDto ||
      !createMovementReportDto.mov_r_name ||
      !createMovementReportDto.mov_r_time
    ) {
      throw new HttpException(
        'Algunos datos del movimiento de reporte es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const FindmovementReport = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: createMovementReportDto.mov_r_name,
        mov_r_time: createMovementReportDto.mov_r_time,
        mov_r_status: true,
      },
    });

    if (FindmovementReport) {
      throw new HttpException(
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
      throw new HttpException(
        'No se encontró la lista de movimientos de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    return movementReports;
  }

  async findOneMovementReport(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del movimiento de reporte es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const movementReport = await this.movementReportRepository.findOne({
      where: { id, mov_r_status: true },
    });

    if (!movementReport) {
      throw new HttpException(
        'No se encontró el movimiento de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    return movementReport;
  }

  async findOneMovementReportByName(movementName: string) {
    if (!movementName) {
      throw new HttpException(
        'El nombre del movimiento de reporte es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const movementReportName = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: movementName,
        mov_r_status: true,
      },
    });

    if (!movementReportName) {
      throw new HttpException(
        `El movimiento ${movementName} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return movementReportName;
  }

  async updateMovementReport(
    id: number,
    updateMovementReportDto: UpdateMovementReportDto,
  ) {
    if (!updateMovementReportDto) {
      throw new HttpException(
        'Los datos para actualizar el movimiento de reporte son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const movementReport = await this.findOneMovementReport(id);
    const result = await this.movementReportRepository.update(
      movementReport.id,
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
    const movementReport = await this.findOneMovementReport(id);
    const result = await this.movementReportRepository.softDelete(
      movementReport.id,
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
