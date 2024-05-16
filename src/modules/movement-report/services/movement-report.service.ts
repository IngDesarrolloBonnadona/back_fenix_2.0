import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovementReportDto } from '../dto/create-movement-report.dto';
import { UpdateMovementReportDto } from '../dto/update-movement-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementReport as MovementReportEntity } from '../entities/movement-report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovementReportService {
  constructor(
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>
  ){}

  async createMovementReport(createMovementReportDto: CreateMovementReportDto) {
    const movementReport = this.movementReportRepository.create(createMovementReportDto);
    return await this.movementReportRepository.save(movementReport);
  }

  async findAllMovementReports() {
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

  async findOneMovementReport(id: number) {
    const movementReport = await this.movementReportRepository.findOne({ where: { id } });

    if (!movementReport) {
      throw new HttpException(
        'No se encontró el movimiento de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    return movementReport
  }

  async updateMovementReport(id: number, updateMovementReportDto: UpdateMovementReportDto) {
    const movementReport = await this.findOneMovementReport(id);

    Object.assign(movementReport, updateMovementReportDto)

    movementReport.updateAt = new Date();

    return await this.movementReportRepository.save(movementReport);
  }

  async deleteMovementReport(id: number) {
    const movementReport = await this.findOneMovementReport(id);
    const result = await this.movementReportRepository.softDelete(movementReport.id);
    
    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el movimiento de reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
    return { message: `El movimiento de reporte se eliminó correctamente`}
  }
}
