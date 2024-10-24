import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateFailedMeasureDto } from '../dto/create-failed-measure.dto';
import { UpdateFailedMeasureDto } from '../dto/update-failed-measure.dto';

import { FailedMeasure } from '../entities/failed-measure.entity';

@Injectable()
export class FailedMeasuresService {
  constructor(
    @InjectRepository(FailedMeasure)
    private readonly failedMeasureRepository: Repository<FailedMeasure>,
  ) {}

  async createFailedMeasure(createFailedMeasureDto: CreateFailedMeasureDto) {
    if (!createFailedMeasureDto || !createFailedMeasureDto.meas_f_name) {
      return new HttpException(
        'El nombre de la medida fallida es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findFailedMeasure = await this.failedMeasureRepository.findOne({
      where: {
        meas_f_name: createFailedMeasureDto.meas_f_name,
        meas_f_status: true,
      },
    });

    if (findFailedMeasure) {
      return new HttpException(
        'La medida fallida ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const failedMeasure = this.failedMeasureRepository.create(
      createFailedMeasureDto,
    );
    await this.failedMeasureRepository.save(failedMeasure);

    return new HttpException(
      `¡La medida fallida ${failedMeasure.meas_f_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllFailedMeasures() {
    const failedMeasures = await this.failedMeasureRepository.find({
      where: { meas_f_status: true },
      order: { meas_f_name: 'ASC' },
    });

    if (failedMeasures.length === 0) {
      return new HttpException(
        'No se encontró la lista de medidas fallida.',
        HttpStatus.NOT_FOUND,
      );
    }
    return failedMeasures;
  }

  async findOneFailedMeasure(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador de la medida fallida es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const failedMeasures = await this.failedMeasureRepository.findOne({
      where: { id, meas_f_status: true },
    });

    if (!failedMeasures) {
      return new HttpException(
        'No se encontró la medida fallida.',
        HttpStatus.NOT_FOUND,
      );
    }

    return failedMeasures;
  }

  async updateFailedMeasure(
    id: number,
    updateFailedMeasureDto: UpdateFailedMeasureDto,
  ) {
    if (!updateFailedMeasureDto) {
      return new HttpException(
        'Los datos para actualizar la medida fallida es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneFailedMeasure(id);
    const result = await this.failedMeasureRepository.update(
      id,
      updateFailedMeasureDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la medida fallida.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteFailedMeasure(id: number) {
    const failedMeasureFound = await this.failedMeasureRepository.findOneBy({
      id,
    });

    if (!failedMeasureFound) {
      return new HttpException(
        `Medida fallida no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.failedMeasureRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la medida fallida.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
