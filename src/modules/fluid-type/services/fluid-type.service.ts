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
    const findFluidType = await this.fluidTypeRespository.findOne({
      where: { flu_t_name: createFluidTypeDto.flu_t_name, flu_t_status: true },
    });

    if (findFluidType) {
      throw new HttpException(
        'El tipo de fluido ya existe.',
        HttpStatus.CONFLICT,
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
        HttpStatus.NO_CONTENT,
      );
    }

    return fluidTypes;
  }

  async findOneFluidTypes(id: number) {
    const fluidType = await this.fluidTypeRespository.findOne({
      where: { id, flu_t_status: true },
    });

    if (!fluidType) {
      throw new HttpException(
        'No se encontró el tipo de fluido.',
        HttpStatus.NO_CONTENT,
      );
    }

    return fluidType;
  }

  async updateFluidTypes(id: number, updateFluidTypeDto: UpdateFluidTypeDto) {
    const fluidType = await this.findOneFluidTypes(id);
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

  async deleteFluidTypes(id: number) {
    const fluidType = await this.findOneFluidTypes(id);
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
