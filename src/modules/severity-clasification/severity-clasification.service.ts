import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeverityClasificationDto } from './dto/create-severity-clasification.dto';
import { UpdateSeverityClasificationDto } from './dto/update-severity-clasification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SeverityClasification as SeverityClasifEntity } from './entities/severity-clasification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeverityClasificationService {
  constructor(
    @InjectRepository(SeverityClasifEntity)
    private readonly severityClasifRepository: Repository<SeverityClasifEntity>,
  ) {}

  async create(createSeverityClasificationDto: CreateSeverityClasificationDto) {
    const severityClasif = this.severityClasifRepository.create(createSeverityClasificationDto);
    return await this.severityClasifRepository.save(severityClasif);
  }

  async findAll() {
    return await this.severityClasifRepository.find({
      relations: {
        caseReportOriginal: true
      }
    });
  }

  async findOne(id: number) {
    return await this.severityClasifRepository.findOne({ where: { id } });
  }

  async update(id: number, updateSeverityClasificationDto: UpdateSeverityClasificationDto) {
    const severityClasif = await this.findOne(id);

    if (!severityClasif) {
      throw new NotFoundException();
    }

    Object.assign(severityClasif, updateSeverityClasificationDto)

    severityClasif.csev_fecha_actualizacion = new Date();
    
    return await this.severityClasifRepository.save(severityClasif);
  }

  async remove(id: number) {
    const severityClasif = await this.findOne(id);

    if (!severityClasif) {
      throw new NotFoundException();
    }
    return await this.severityClasifRepository.remove(severityClasif);
  }
}
