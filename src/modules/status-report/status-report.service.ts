import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusReportDto } from './dto/create-status-report.dto';
import { UpdateStatusReportDto } from './dto/update-status-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusReport as StatusReportEntity } from './entities/status-report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusReportService {
  constructor(
    @InjectRepository(StatusReportEntity)
    private readonly statusReportRepository: Repository<StatusReportEntity>
  ){}

  async create(createStatusReportDto: CreateStatusReportDto) {
    const statusReport = this.statusReportRepository.create(createStatusReportDto);
    return await this.statusReportRepository.save(statusReport);
  }

  async findAll() {
    const statusReports = await this.statusReportRepository.find({
      relations: {
        movementReport: true,
        caseReportOriginal: true
      }
    })

    if (!statusReports) {
      throw new HttpException(
        'No se encontró la lista de estado de reportes',
        HttpStatus.NOT_FOUND,
      );
    }

    return statusReports
  }

  async findOne(id: number) {
    const statusReport = await this.statusReportRepository.findOne({ where: { id } });

    if (!statusReport) {
      throw new HttpException(
        'No se encontró el estado de reporte',
        HttpStatus.NOT_FOUND,
      );
    }

    return statusReport
  }

  async update(id: number, updateStatusReportDto: UpdateStatusReportDto) {
    const statusReport = await this.findOne(id);

    if (!statusReport) {
      throw new HttpException(
        'No se encontró el estado de reporte',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(statusReport, updateStatusReportDto)

    statusReport.erep_fecha_actualizacion = new Date();
    
    return await this.statusReportRepository.save(statusReport);
  }

  async remove(id: number) {
    const statusReport = await this.findOne(id);

    if (!statusReport) {
      throw new HttpException(
        'No se encontró el estado de reporte',
        HttpStatus.NOT_FOUND,
      );
    }

    statusReport.erep_fecha_eliminacion = new Date();
    statusReport.erep_estado = false;

    return await this.statusReportRepository.save(statusReport);
  }
}
