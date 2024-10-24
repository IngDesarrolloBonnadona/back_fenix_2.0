import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateSeverityClasificationDto } from '../dto/create-severity-clasification.dto';
import { UpdateSeverityClasificationDto } from '../dto/update-severity-clasification.dto';

import { SeverityClasification } from '../entities/severity-clasification.entity';

@Injectable()
export class SeverityClasificationService {
  constructor(
    @InjectRepository(SeverityClasification)
    private readonly severityClasifRepository: Repository<SeverityClasification>,
  ) {}

  async createSeverityClasification(
    createSeverityClasificationDto: CreateSeverityClasificationDto,
  ) {
    if (
      !createSeverityClasificationDto ||
      !createSeverityClasificationDto.sev_c_name
    ) {
      return new HttpException(
        'El nombre de clasificación de seguridad es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const FindSevClasification = await this.severityClasifRepository.findOne({
      where: {
        sev_c_name: createSeverityClasificationDto.sev_c_name,
        sev_c_status: true,
      },
    });

    if (FindSevClasification) {
      return new HttpException(
        'La clasificación de severidad ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const severityClasif = this.severityClasifRepository.create(
      createSeverityClasificationDto,
    );
    await this.severityClasifRepository.save(severityClasif);

    return new HttpException(
      `¡La clasificiación de severidad ${severityClasif.sev_c_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllSeverityClasifications() {
    const severityClasifs = await this.severityClasifRepository.find({
      where: {
        sev_c_status: true,
      },
      order: {
        sev_c_name: 'ASC',
      },
    });

    if (severityClasifs.length === 0) {
      return new HttpException(
        'No se encontró la lista de clasificaciones de severidad',
        HttpStatus.NOT_FOUND,
      );
    }

    return severityClasifs;
  }

  async findOneSeverityClasification(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador de clasificación de severidad es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const severityClasif = await this.severityClasifRepository.findOne({
      where: { id, sev_c_status: true },
    });

    if (!severityClasif) {
      return new HttpException(
        'No se encontró la clasificación de severidad',
        HttpStatus.NOT_FOUND,
      );
    }

    return severityClasif;
  }

  async updateSeverityClasification(
    id: number,
    updateSeverityClasificationDto: UpdateSeverityClasificationDto,
  ) {
    if (!updateSeverityClasificationDto) {
      return new HttpException(
        'Los datos para actualizar la clasificación de severidad son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneSeverityClasification(id);
    const result = await this.severityClasifRepository.update(
      id,
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
      HttpStatus.OK,
    );
  }

  async deleteSeverityClasification(id: number) {
    const severityClasifFound = await this.severityClasifRepository.findOneBy({
      id,
    });

    if (!severityClasifFound) {
      return new HttpException(
        `Clasificación de severidad no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.severityClasifRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la clasificacion de severidad.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
