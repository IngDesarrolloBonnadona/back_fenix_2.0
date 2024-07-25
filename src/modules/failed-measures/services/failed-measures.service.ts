import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFailedMeasureDto } from '../dto/create-failed-measure.dto';
import { UpdateFailedMeasureDto } from '../dto/update-failed-measure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FailedMeasure as FailedMeasureEntity } from '../entities/failed-measure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FailedMeasuresService {
  constructor(
    @InjectRepository(FailedMeasureEntity)
    private readonly failedMeasureRepository: Repository<FailedMeasureEntity>,
  ) {}

  async createFailedMeasure(createFailedMeasureDto: CreateFailedMeasureDto) {
    const findFailedMeasure = await this.failedMeasureRepository.findOne({
      where: {
        meas_f_name: createFailedMeasureDto.meas_f_name,
        meas_f_status: true,
      },
    });

    if (findFailedMeasure) {
      throw new HttpException(
        'La medida fallida ya existe.',
        HttpStatus.CONFLICT,
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
      throw new HttpException(
        'No se encontró la lista de medidas fallida.',
        HttpStatus.NO_CONTENT,
      );
    }
    return failedMeasures;
  }

  async findOneFailedMeasure(id: number) {
    const failedMeasures = await this.failedMeasureRepository.findOne({
      where: { id, meas_f_status: true },
    });

    if (!failedMeasures) {
      throw new HttpException(
        'No se encontró la medida fallida.',
        HttpStatus.NO_CONTENT,
      );
    }

    return failedMeasures;
  }

  async updateFailedMeasure(
    id: number,
    updateFailedMeasureDto: UpdateFailedMeasureDto,
  ) {
    const failedMeasure = await this.findOneFailedMeasure(id);
    const result = await this.failedMeasureRepository.update(
      failedMeasure.id,
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
    const failedMeasure = await this.findOneFailedMeasure(id);
    const result = await this.failedMeasureRepository.softDelete(
      failedMeasure.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la medida fallida.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
