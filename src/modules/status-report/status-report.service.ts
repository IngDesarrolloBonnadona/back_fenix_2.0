import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.statusReportRepository.find({
      relations: {
        movementReport: true,
        caseReportOriginal: true
      }
    })
  }

  async findOne(id: number) {
    return await this.statusReportRepository.findOne({ where: { id } });
  }

  async update(id: number, updateStatusReportDto: UpdateStatusReportDto) {
    const statusReport = await this.findOne(id);

    if (!statusReport) {
      throw new NotFoundException();
    }

    Object.assign(statusReport, updateStatusReportDto)

    statusReport.erep_fecha_actualizacion = new Date();
    
    return await this.statusReportRepository.save(statusReport);
  }

  async remove(id: number) {
    const statusReport = await this.findOne(id);

    if (!statusReport) {
      throw new NotFoundException();
    }
    return await this.statusReportRepository.remove(statusReport);
  }
}
