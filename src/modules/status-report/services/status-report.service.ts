import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusReportDto } from '../dto/create-status-report.dto';
import { UpdateStatusReportDto } from '../dto/update-status-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusReport as StatusReportEntity } from '../entities/status-report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusReportService {
  constructor(
    @InjectRepository(StatusReportEntity)
    private readonly statusReportRepository: Repository<StatusReportEntity>
  ){}

  async createStatusReport(createStatusReportDto: CreateStatusReportDto) {
    const statusReport = this.statusReportRepository.create(createStatusReportDto);
    return await this.statusReportRepository.save(statusReport);
  }

  async findAllStatusReports() {
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

  async findOneStatusReport(id: number) {
    const statusReport = await this.statusReportRepository.findOne({ where: { id } });

    if (!statusReport) {
      throw new HttpException(
        'No se encontró el estado de reporte',
        HttpStatus.NOT_FOUND,
      );
    }

    return statusReport
  }

  async updateStatusReport(id: number, updateStatusReportDto: UpdateStatusReportDto) {
    const statusReport = await this.findOneStatusReport(id);

    Object.assign(statusReport, updateStatusReportDto)

    statusReport.updateAt = new Date();
    
    return await this.statusReportRepository.save(statusReport);
  }

  async deleteStatusReport(id: number) {
    const statusReport = await this.findOneStatusReport(id);

    const isEliminated = await this.statusReportRepository.softDelete(statusReport.id);

    if (isEliminated) {
      throw new HttpException(
        `El estado del reporte #${id} se eliminó correctamente`,
        HttpStatus.OK,
      );
    }  
  }
}
