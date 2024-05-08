import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.movementReportRepository.find({
      relations: {
        statusReport: true
      }
    })
  }

  async findOne(id: number) {
    return await this.movementReportRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMovementReportDto: UpdateMovementReportDto) {
    const movementReport = await this.findOne(id);

    if (!movementReport) {
      throw new NotFoundException();
    }

    Object.assign(movementReport, updateMovementReportDto)

    movementReport.mrep_fecha_actualizacion = new Date();

    return await this.movementReportRepository.save(movementReport);
  }

  async remove(id: number) {
    const movementReport = await this.findOne(id);

    if (!movementReport) {
      throw new NotFoundException();
    }
    return await this.movementReportRepository.remove(movementReport);
  }
}
