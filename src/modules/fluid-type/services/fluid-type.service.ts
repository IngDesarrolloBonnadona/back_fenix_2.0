import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFluidTypeDto } from '../dto/create-fluid-type.dto';
import { UpdateFluidTypeDto } from '../dto/update-fluid-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FluidType as FluidTypeEntity } from '../entities/fluid-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FluidTypeService {
  constructor(
    @InjectRepository(FluidTypeEntity)
    private readonly fluidTypeRespository: Repository<FluidTypeEntity>,
  ) {}

  async createFluidType(createFluidTypeDto: CreateFluidTypeDto) {
    if (!createFluidTypeDto || !createFluidTypeDto.flu_t_name) {
      throw new HttpException(
        'El nombre del tipo de fluido es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findFluidType = await this.fluidTypeRespository.findOne({
      where: {
        flu_t_name: createFluidTypeDto.flu_t_name,
        flu_t_status: true,
      },
    });

    if (findFluidType) {
      throw new HttpException(
        'El tipo de fluido ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const fluidType = this.fluidTypeRespository.create(createFluidTypeDto);
    await this.fluidTypeRespository.save(fluidType);

    return new HttpException(
      `¡El tipo de fluido ${fluidType.flu_t_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllFluidTypes() {
    const fluidTypes = await this.fluidTypeRespository.find({
      where: { flu_t_status: true },
      order: { flu_t_name: 'ASC' },
    });

    if (fluidTypes.length === 0) {
      throw new HttpException(
        'No se encontró la lista de tipos de fluido.',
        HttpStatus.NOT_FOUND,
      );
    }

    return fluidTypes;
  }

  async findOneFluidType(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del tipo de fluido es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fluidType = await this.fluidTypeRespository.findOne({
      where: { id, flu_t_status: true },
    });

    if (!fluidType) {
      throw new HttpException(
        'No se encontró el tipo de fluido.',
        HttpStatus.NOT_FOUND,
      );
    }

    return fluidType;
  }

  async updateFluidType(id: number, updateFluidTypeDto: UpdateFluidTypeDto) {
    if (!updateFluidTypeDto) {
      throw new HttpException(
        'Los datos para actualizar el tipo de fluido son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fluidType = await this.findOneFluidType(id);
    const result = await this.fluidTypeRespository.update(
      fluidType.id,
      updateFluidTypeDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tipo de fluido.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteFluidType(id: number) {
    const fluidType = await this.findOneFluidType(id);
    const result = await this.fluidTypeRespository.softDelete(fluidType.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de fluido.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
