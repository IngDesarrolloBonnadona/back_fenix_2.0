import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFluidTypeDto } from '../dto/create-fluid-type.dto';
import { UpdateFluidTypeDto } from '../dto/update-fluid-type.dto';

import { FluidType } from '../entities/fluid-type.entity';

@Injectable()
export class FluidTypeService {
  constructor(
    @InjectRepository(FluidType)
    private readonly fluidTypeRespository: Repository<FluidType>,
  ) {}

  async createFluidType(createFluidTypeDto: CreateFluidTypeDto) {
    if (!createFluidTypeDto || !createFluidTypeDto.flu_t_name) {
      return new HttpException(
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
      return new HttpException(
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
      return new HttpException(
        'No se encontró la lista de tipos de fluido.',
        HttpStatus.NOT_FOUND,
      );
    }

    return fluidTypes;
  }

  async findOneFluidType(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del tipo de fluido es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fluidType = await this.fluidTypeRespository.findOne({
      where: { id, flu_t_status: true },
    });

    if (!fluidType) {
      return new HttpException(
        'No se encontró el tipo de fluido.',
        HttpStatus.NOT_FOUND,
      );
    }

    return fluidType;
  }

  async updateFluidType(id: number, updateFluidTypeDto: UpdateFluidTypeDto) {
    if (!updateFluidTypeDto) {
      return new HttpException(
        'Los datos para actualizar el tipo de fluido son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneFluidType(id);
    const result = await this.fluidTypeRespository.update(
      id,
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
    const fluidTypeFound = await this.fluidTypeRespository.findOneBy({ id });

    if (!fluidTypeFound) {
      return new HttpException(
        `Tipo de fluido no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.fluidTypeRespository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de fluido.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
