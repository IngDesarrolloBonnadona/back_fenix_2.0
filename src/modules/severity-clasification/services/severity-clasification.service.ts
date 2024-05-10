import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeverityClasificationDto } from '../dto/create-severity-clasification.dto';
import { UpdateSeverityClasificationDto } from '../dto/update-severity-clasification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SeverityClasification as SeverityClasifEntity } from '../entities/severity-clasification.entity';
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
    const severityClasifs = await this.severityClasifRepository.find({
      relations: {
        caseReportOriginal: true
      }
    });

    if (!severityClasifs) {
      throw new HttpException(
        'No se encontró la lista de clasificaciones de severidad',
        HttpStatus.NOT_FOUND,
      );
    }

    return severityClasifs
  }

  async findOne(id: number) {
    const severityClasif = await this.severityClasifRepository.findOne({ where: { id } });

    if (!severityClasif) {
      throw new HttpException(
        'No se encontró la clasificacion de severidad',
        HttpStatus.NOT_FOUND,
      );
    }

    return severityClasif
  }

  async update(id: number, updateSeverityClasificationDto: UpdateSeverityClasificationDto) {
    const severityClasif = await this.findOne(id);

    if (!severityClasif) {
      throw new HttpException(
        'No se encontró la clasificacion de severidad',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(severityClasif, updateSeverityClasificationDto)

    severityClasif.updateAt = new Date();
    
    return await this.severityClasifRepository.save(severityClasif);
  }

  async remove(id: number) {
    const severityClasif = await this.findOne(id);

    if (!severityClasif) {
      throw new HttpException(
        'No se encontró la clasificacion de severidad',
        HttpStatus.NOT_FOUND,
      );
    }

    severityClasif.deletedAt = new Date();
    severityClasif.sev_c_status = false;

    return await this.severityClasifRepository.save(severityClasif);
  }
}
