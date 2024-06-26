import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovementReportDto } from '../dto/create-movement-report.dto';
import { UpdateMovementReportDto } from '../dto/update-movement-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementReport as MovementReportEntity } from '../entities/movement-report.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class MovementReportService {
  constructor(
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>,
  ) {}

  async createMovementReport(
    createMovementReportDto: CreateMovementReportDto,
  ): Promise<MovementReportEntity> {
    const FindmovementReport = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: createMovementReportDto.mov_r_name,
        mov_r_time: createMovementReportDto.mov_r_time,
        mov_r_status: true,
      },
    });

    if (FindmovementReport) {
      throw new HttpException(
        'El movimiento del reporte ya existe.',
        HttpStatus.CONFLICT,
      );
    }
    const movementReport = this.movementReportRepository.create(
      createMovementReportDto,
    );
    return await this.movementReportRepository.save(movementReport);
  }

  async findAllMovementReports(): Promise<MovementReportEntity[]> {
    const movementReports = await this.movementReportRepository.find({
      // relations: {
      //   caseReportValidate: true,
      // },
    });

    if (movementReports.length === 0) {
      throw new HttpException(
        'No se encontró la lista de movimientos de reportes.',
        HttpStatus.NO_CONTENT,
      );
    }

    return movementReports;
  }

  async findOneMovementReport(id: number): Promise<MovementReportEntity> {
    const movementReport = await this.movementReportRepository.findOne({
      where: { id },
      // relations: {
      //   caseReportValidate: true,
      // },
    });

    if (!movementReport) {
      throw new HttpException(
        'No se encontró el movimiento de reporte.',
        HttpStatus.NO_CONTENT,
      );
    }

    return movementReport;
  }

  async updateMovementReport(
    id: number,
    updateMovementReportDto: UpdateMovementReportDto,
  ) {
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
      HttpStatus.ACCEPTED,
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
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
