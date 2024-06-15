import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOriginDto } from '../dto/create-origin.dto';
import { UpdateOriginDto } from '../dto/update-origin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Origin as OriginEntity } from '../entities/origin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OriginService {
  constructor(
    @InjectRepository(OriginEntity)
    private readonly originRepository: Repository<OriginEntity>,
  ) {}

  async createOrigin(createOriginDto: CreateOriginDto) {
    const origin = this.originRepository.create(createOriginDto);
    return await this.originRepository.save(origin);
  }

  async findAllOrigins() {
    const origins = await this.originRepository.find({
      relations: {
        subOrigins: true,
        caseReportOriginal: true,
      },
    });

    if (origins.length === 0) {
      throw new HttpException(
        'No se encontró la lista de fuentes',
        HttpStatus.NO_CONTENT,
      );
    }

    return origins;
  }

  async findOneOrigin(id: number) {
    const origin = await this.originRepository.findOne({
      where: { id },
      relations: {
        subOrigins: true,
        caseReportOriginal: true,
      },
    });

    if (!origin) {
      throw new HttpException(
        'No se encontró la fuente',
        HttpStatus.NO_CONTENT,
      );
    }

    return origin;
  }

  async updateOrigin(id: number, updateOriginDto: UpdateOriginDto) {
    const origin = await this.findOneOrigin(id);
    const result = await this.originRepository.update(
      origin.id,
      updateOriginDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la fuente`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteOrigin(id: number) {
    const origin = await this.findOneOrigin(id);
    const result = await this.originRepository.softDelete(origin.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el origen`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
