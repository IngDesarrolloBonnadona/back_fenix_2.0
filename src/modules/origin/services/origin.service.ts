import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateOriginDto } from '../dto/create-origin.dto';
import { UpdateOriginDto } from '../dto/update-origin.dto';

import { Origin } from '../entities/origin.entity';

@Injectable()
export class OriginService {
  constructor(
    @InjectRepository(Origin)
    private readonly originRepository: Repository<Origin>,
  ) {}

  async createOrigin(createOriginDto: CreateOriginDto) {
    if (!createOriginDto || !createOriginDto.orig_name) {
      throw new HttpException(
        'El nombre del origen es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findOrigin = await this.originRepository.findOne({
      where: {
        orig_name: createOriginDto.orig_name,
        orig_status: true,
      },
    });

    if (findOrigin) {
      throw new HttpException(
        'El origen ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const origin = this.originRepository.create(createOriginDto);
    await this.originRepository.save(origin);

    return new HttpException(
      `¡El origen ${origin.orig_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllOrigins() {
    const origins = await this.originRepository.find({
      where: {
        orig_status: true,
      },
      relations: {
        subOrigins: true,
      },
      order: {
        orig_name: 'ASC',
      },
    });

    if (origins.length === 0) {
      throw new HttpException(
        'No se encontró la lista de origenes',
        HttpStatus.NOT_FOUND,
      );
    }

    return origins;
  }

  async findOneOrigin(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del origen es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const origin = await this.originRepository.findOne({
      where: { id, orig_status: true },
      relations: {
        subOrigins: true,
      },
    });

    if (!origin) {
      throw new HttpException('No se encontró el origen', HttpStatus.NOT_FOUND);
    }

    return origin;
  }

  async updateOrigin(id: number, updateOriginDto: UpdateOriginDto) {
    if (!updateOriginDto) {
      throw new HttpException(
        'Los datos para actualizar el origen son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const origin = await this.findOneOrigin(id);
    const result = await this.originRepository.update(
      origin.id,
      updateOriginDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el origen`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteOrigin(id: number) {
    const originFound = await this.originRepository.findOneBy({ id });

    if (!originFound) {
      return new HttpException(
        `Origen no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.originRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el origen`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
