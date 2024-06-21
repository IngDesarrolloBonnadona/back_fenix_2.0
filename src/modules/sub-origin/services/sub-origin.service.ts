import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubOriginDto } from '../dto/create-sub-origin.dto';
import { UpdateSubOriginDto } from '../dto/update-sub-origin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubOrigin as SubOriginEntity } from '../entities/sub-origin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubOriginService {
  constructor(
    @InjectRepository(SubOriginEntity)
    private readonly subOriginRepository: Repository<SubOriginEntity>,
  ) {}

  async createSubOrigin(
    createSubOriginDto: CreateSubOriginDto,
  ): Promise<SubOriginEntity> {
    const subOrigin = this.subOriginRepository.create(createSubOriginDto);
    return await this.subOriginRepository.save(subOrigin);
  }

  async findAllSubOrigins(): Promise<SubOriginEntity[]> {
    const subOrigins = await this.subOriginRepository.find({
      relations: {
        origin: true,
        caseReportOriginal: true,
      },
    });

    if (subOrigins.length === 0) {
      throw new HttpException(
        'No se encontró la lista de subfuentes',
        HttpStatus.NO_CONTENT,
      );
    }

    return subOrigins;
  }

  async findOneSubOrigin(id: number): Promise<SubOriginEntity> {
    const subOrigin = await this.subOriginRepository.findOne({
      where: { id },
      relations: {
        origin: true,
        caseReportOriginal: true,
      },
    });

    if (!subOrigin) {
      throw new HttpException(
        'No se encontró el subfuente',
        HttpStatus.NO_CONTENT,
      );
    }

    return subOrigin;
  }

  async updateSubOrigin(id: number, updateSubOriginDto: UpdateSubOriginDto) {
    const subOrigin = await this.findOneSubOrigin(id);
    const result = await this.subOriginRepository.update(
      subOrigin.id,
      updateSubOriginDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el sub fuente`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteSubOrigin(id: number) {
    const subOrigin = await this.findOneSubOrigin(id);
    const result = await this.subOriginRepository.softDelete(subOrigin.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el suborigen.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
