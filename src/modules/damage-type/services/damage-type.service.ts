import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateDamageTypeDto } from '../dto/create-damage-type.dto';
import { UpdateDamageTypeDto } from '../dto/update-damage-type.dto';

import { DamageType } from '../entities/damage-type.entity';

@Injectable()
export class DamageTypeService {
  constructor(
    @InjectRepository(DamageType)
    private readonly damageTypeRepository: Repository<DamageType>,
  ) {}

  async createDamageType(createDamageTypeDto: CreateDamageTypeDto) {
    if (!createDamageTypeDto || !createDamageTypeDto.dam_t_name) {
      return new HttpException(
        'El nombre del tipo de daño es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findDamageType = await this.damageTypeRepository.findOne({
      where: { dam_t_name: createDamageTypeDto.dam_t_name, dam_t_status: true },
    });

    if (findDamageType) {
      return new HttpException(
        'El tipo de daño ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const damageType = this.damageTypeRepository.create(createDamageTypeDto);
    await this.damageTypeRepository.save(damageType);

    return new HttpException(
      `¡El tipo de daño ${damageType.dam_t_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllDamageType() {
    const damageTypes = await this.damageTypeRepository.find({
      where: { dam_t_status: true },
      order: { dam_t_name: 'ASC' },
    });

    if (damageTypes.length === 0) {
      return new HttpException(
        'No se encontró la lista de tipos de daño.',
        HttpStatus.NOT_FOUND,
      );
    }
    return damageTypes;
  }

  async findOneDamageType(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del tipo de daño es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const damageType = await this.damageTypeRepository.findOne({
      where: { id, dam_t_status: true },
    });

    if (!damageType) {
      return new HttpException(
        'No se encontró el tipo de daño.',
        HttpStatus.NOT_FOUND,
      );
    }
    return damageType;
  }

  async updateDamageType(id: number, updateDamageTypeDto: UpdateDamageTypeDto) {
    if (!updateDamageTypeDto) {
      return new HttpException(
        'Los datos para actualizar el tipo de daño son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneDamageType(id);
    const result = await this.damageTypeRepository.update(
      id,
      updateDamageTypeDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tipo de daño.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteDamageType(id: number) {
    const damageTypeFound = await this.damageTypeRepository.findOneBy({ id });

    if (!damageTypeFound) {
      return new HttpException(
        `Tipo de daño no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.damageTypeRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de daño.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
