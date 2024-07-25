import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDamageTypeDto } from '../dto/create-damage-type.dto';
import { UpdateDamageTypeDto } from '../dto/update-damage-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DamageType as DamageTypeEntity } from '../entities/damage-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DamageTypeService {
  constructor(
    @InjectRepository(DamageTypeEntity)
    private readonly damageTypeRepository: Repository<DamageTypeEntity>,
  ) {}

  async createDamageType(createDamageTypeDto: CreateDamageTypeDto) {
    const findDamageType = await this.damageTypeRepository.findOne({
      where: { dam_t_name: createDamageTypeDto.dam_t_name, dam_t_status: true },
    });

    if (findDamageType) {
      throw new HttpException(
        'El tipo de daño ya existe.',
        HttpStatus.CONFLICT,
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
    const damageType = await this.damageTypeRepository.find({
      where: { dam_t_status: true },
      order: { dam_t_name: 'ASC' },
    });

    if (damageType.length === 0) {
      throw new HttpException(
        'No se encontró la lista de tipo de daños.',
        HttpStatus.NO_CONTENT,
      );
    }
    return damageType;
  }

  async findOneDamageType(id: number) {
    const damageType = await this.damageTypeRepository.findOne({
      where: { id, dam_t_status: true },
    });

    if (!damageType) {
      throw new HttpException(
        'No se encontró el tipo de daño.',
        HttpStatus.NO_CONTENT,
      );
    }
    return damageType;
  }

  async updateDamageType(id: number, updateDamageTypeDto: UpdateDamageTypeDto) {
    const damageType = await this.findOneDamageType(id);
    const result = await this.damageTypeRepository.update(
      damageType.id,
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
    const damageType = await this.findOneDamageType(id);
    const result = await this.damageTypeRepository.softDelete(damageType.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de daño.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
