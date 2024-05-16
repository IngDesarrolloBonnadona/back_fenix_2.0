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

  async createSeverityClasification(createSeverityClasificationDto: CreateSeverityClasificationDto) {
    const severityClasif = this.severityClasifRepository.create(createSeverityClasificationDto);
    return await this.severityClasifRepository.save(severityClasif);
  }

  async findAllSeverityClasifications() {
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

  async findOneSeverityClasification(id: number) {
    const severityClasif = await this.severityClasifRepository.findOne({ where: { id } });

    if (!severityClasif) {
      throw new HttpException(
        'No se encontró la clasificacion de severidad',
        HttpStatus.NOT_FOUND,
      );
    }

    return severityClasif
  }

  async updateSeverityClasification(id: number, updateSeverityClasificationDto: UpdateSeverityClasificationDto) {
    const severityClasif = await this.findOneSeverityClasification(id);

    Object.assign(severityClasif, updateSeverityClasificationDto)

    severityClasif.updateAt = new Date();
    
    return await this.severityClasifRepository.save(severityClasif);
  }

  async deleteSeverityClasification(id: number) {
    const severityClasif = await this.findOneSeverityClasification(id);
    const result = await this.severityClasifRepository.softDelete(severityClasif.id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar la clasificacion de severidad.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }  
    return { message: `La clasificacion de severidad se eliminó correctamente.`}
  }
}
