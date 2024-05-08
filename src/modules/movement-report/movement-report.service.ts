import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovementReportDto } from './dto/create-movement-report.dto';
import { UpdateMovementReportDto } from './dto/update-movement-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementReport as MovementReportEntity } from './entities/movement-report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovementReportService {
  constructor(
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>
  ){}

  async create(createMovementReportDto: CreateMovementReportDto) {
    const movementReport = this.movementReportRepository.create(createMovementReportDto);
    return await this.movementReportRepository.save(movementReport);
  }

  async findAll() {
    const movementReports = await this.movementReportRepository.find({
      relations: {
        statusReport: true
      }
    })

    if (!movementReports) {
      throw new HttpException(
        'No se encontró la lista de movimientos de reportes.',
        HttpStatus.NOT_FOUND,
      );
    }

    return movementReports
  }

  async findOne(id: number) {
    const movementReport = await this.movementReportRepository.findOne({ where: { id } });

    if (!movementReport) {
      throw new HttpException(
        'No se encontró el movimiento de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    return movementReport
  }

  async update(id: number, updateMovementReportDto: UpdateMovementReportDto) {
    const movementReport = await this.findOne(id);

    if (!movementReport) {
      throw new HttpException(
        'No se encontró el movimiento de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(movementReport, updateMovementReportDto)

    movementReport.mrep_fecha_actualizacion = new Date();

    return await this.movementReportRepository.save(movementReport);
  }

  async remove(id: number) {
    const movementReport = await this.findOne(id);

    if (!movementReport) {
      throw new HttpException(
        'No se encontró el movimiento de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    movementReport.mrep_fecha_eliminacion = new Date();
    movementReport.mrep_estado = false;
    
    return await this.movementReportRepository.save(movementReport);
  }
}
