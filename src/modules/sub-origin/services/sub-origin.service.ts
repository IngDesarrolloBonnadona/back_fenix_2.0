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
import { OriginService } from 'src/modules/origin/services/origin.service';

@Injectable()
export class SubOriginService {
  constructor(
    @InjectRepository(SubOriginEntity)
    private readonly subOriginRepository: Repository<SubOriginEntity>,

    private readonly originService: OriginService,
  ) {}

  async createSubOrigin(createSubOriginDto: CreateSubOriginDto) {
    if (
      !createSubOriginDto ||
      !createSubOriginDto.sub_o_name ||
      !createSubOriginDto.sub_o_origin_id_fk
    ) {
      return new HttpException(
        'Algunos datos de sub origen son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const FindSubOrigin = await this.subOriginRepository.findOne({
      where: {
        sub_o_name: createSubOriginDto.sub_o_name,
        sub_o_origin_id_fk: createSubOriginDto.sub_o_origin_id_fk,
        sub_o_status: true,
      },
    });

    if (FindSubOrigin) {
      return new HttpException(
        'El sub origen ya existe con el origen seleccionado.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const subOrigin = this.subOriginRepository.create(createSubOriginDto);
    await this.subOriginRepository.save(subOrigin);

    return new HttpException(
      `¡El sub origen ${subOrigin.sub_o_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllSubOrigins() {
    const subOrigins = await this.subOriginRepository.find({
      where: {
        sub_o_status: true,
      },
      relations: {
        origin: true,
      },
      order: {
        sub_o_name: 'ASC',
      },
    });

    if (subOrigins.length === 0) {
      return new HttpException(
        'No se encontró la lista de sub origenes.',
        HttpStatus.NOT_FOUND,
      );
    }

    return subOrigins;
  }

  async findOneSubOrigin(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del sub origen es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const subOrigin = await this.subOriginRepository.findOne({
      where: { id, sub_o_status: true },
      relations: {
        origin: true,
      },
    });

    if (!subOrigin) {
      return new HttpException(
        'No se encontró el sub origen.',
        HttpStatus.NOT_FOUND,
      );
    }

    return subOrigin;
  }

  async findSubOriginByOriginId(originId: number) {
    if (!originId) {
      return new HttpException(
        'El identificador del origen es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const subOriginByOrigin = await this.subOriginRepository.find({
      where: {
        sub_o_origin_id_fk: originId,
        sub_o_status: true,
      },
      order: {
        sub_o_name: 'ASC',
      },
    });

    if (!subOriginByOrigin) {
      return new HttpException(
        'No se encontró el sub origen relacionado al origen.',
        HttpStatus.NOT_FOUND,
      );
    }

    return subOriginByOrigin;
  }

  async updateSubOrigin(id: number, updateSubOriginDto: UpdateSubOriginDto) {
    if (!updateSubOriginDto) {
      return new HttpException(
        'Los datos para actualizar el sub origen son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneSubOrigin(id);
    await this.originService.findOneOrigin(
      updateSubOriginDto.sub_o_origin_id_fk,
    );

    const result = await this.subOriginRepository.update(
      id,
      updateSubOriginDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el sub origen.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteSubOrigin(id: number) {
    const subOriginFound = await this.subOriginRepository.findOneBy({ id });

    if (!subOriginFound) {
      return new HttpException(
        `Sub origen no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.subOriginRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el sub origen.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
