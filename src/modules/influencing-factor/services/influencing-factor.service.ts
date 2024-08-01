import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInfluencingFactorDto } from '../dto/create-influencing-factor.dto';
import { UpdateInfluencingFactorDto } from '../dto/update-influencing-factor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InfluencingFactor as InfluencingFactorEntity } from '../entities/influencing-factor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InfluencingFactorService {
  constructor(
    @InjectRepository(InfluencingFactorEntity)
    private readonly influencingFactoryRepository: Repository<InfluencingFactorEntity>,
  ) {}

  async createInfluencingFactor(
    createInfluencingFactorDto: CreateInfluencingFactorDto,
  ) {
    if (!createInfluencingFactorDto || !createInfluencingFactorDto.inf_f_name) {
      throw new HttpException(
        'El nombre del factor de influencia es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findInfluencingFactor =
      await this.influencingFactoryRepository.findOne({
        where: {
          inf_f_name: createInfluencingFactorDto.inf_f_name,
          inf_f_status: true,
        },
      });

    if (findInfluencingFactor) {
      throw new HttpException(
        'El factor de influencia ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const influencingFactor = this.influencingFactoryRepository.create(
      createInfluencingFactorDto,
    );
    await this.influencingFactoryRepository.save(influencingFactor);

    return new HttpException(
      `¡El factor de influencia ${influencingFactor.inf_f_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllInfluencingFactors() {
    const influencingFactor = await this.influencingFactoryRepository.find({
      where: { inf_f_status: true },
      order: { inf_f_name: 'ASC' },
    });

    if (influencingFactor.length === 0) {
      throw new HttpException(
        'No se encontró la lista de factores de influencia.',
        HttpStatus.NOT_FOUND,
      );
    }

    return influencingFactor;
  }

  async findOneInfluencingFactor(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del factor de influencia es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const influencingFactor = await this.influencingFactoryRepository.findOne({
      where: { id, inf_f_status: true },
    });

    if (!influencingFactor) {
      throw new HttpException(
        'No se encontró el factor de influencia.',
        HttpStatus.NOT_FOUND,
      );
    }

    return influencingFactor;
  }

  async updateInfluencingFactor(
    id: number,
    updateInfluencingFactorDto: UpdateInfluencingFactorDto,
  ) {
    if (!updateInfluencingFactorDto) {
      throw new HttpException(
        'Los datos para actualizar el factor de influencia son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const influencingFactor = await this.findOneInfluencingFactor(id);
    const result = await this.influencingFactoryRepository.update(
      influencingFactor.id,
      updateInfluencingFactorDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el factor de influencia`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteInfluencingFactor(id: number) {
    const influencingFactor = await this.findOneInfluencingFactor(id);
    const result = await this.influencingFactoryRepository.softDelete(
      influencingFactor.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el origen`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
