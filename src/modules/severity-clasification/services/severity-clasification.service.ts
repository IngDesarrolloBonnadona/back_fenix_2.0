import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async createSeverityClasification(
    createSeverityClasificationDto: CreateSeverityClasificationDto,
  ) {
    const severityClasif = this.severityClasifRepository.create(
      createSeverityClasificationDto,
    );
    return await this.severityClasifRepository.save(severityClasif);
  }

  async findAllSeverityClasifications() {
    const severityClasifs = await this.severityClasifRepository.find({
      relations: {
        caseReportOriginal: true,
      },
    });

    if (severityClasifs.length === 0) {
      throw new HttpException(
        'No se encontró la lista de clasificaciones de severidad',
        HttpStatus.NO_CONTENT,
      );
    }

    return severityClasifs;
  }

  async findOneSeverityClasification(id: number) {
    const severityClasif = await this.severityClasifRepository.findOne({
      where: { id },
      relations: {
        caseReportOriginal: true,
      },
    });

    if (!severityClasif) {
      throw new HttpException(
        'No se encontró la clasificacion de severidad',
        HttpStatus.NO_CONTENT,
      );
    }

    return severityClasif;
  }

  async updateSeverityClasification(
    id: number,
    updateSeverityClasificationDto: UpdateSeverityClasificationDto,
  ) {
    const severityClasif = await this.findOneSeverityClasification(id);
    const result = await this.severityClasifRepository.update(
      severityClasif.id,
      updateSeverityClasificationDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la clasificacion de severidad`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteSeverityClasification(id: number) {
    const severityClasif = await this.findOneSeverityClasification(id);
    const result = await this.severityClasifRepository.softDelete(
      severityClasif.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la clasificacion de severidad.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
