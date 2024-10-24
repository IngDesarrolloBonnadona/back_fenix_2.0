import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUnsafeActionDto } from '../dto/create-unsafe-action.dto';
import { UpdateUnsafeActionDto } from '../dto/update-unsafe-action.dto';

import { UnsafeAction } from '../entities/unsafe-action.entity';

@Injectable()
export class UnsafeActionService {
  constructor(
    @InjectRepository(UnsafeAction)
    private readonly unsafeActionRepository: Repository<UnsafeAction>,
  ) {}

  async createUnsafeAction(createUnsafeActionDto: CreateUnsafeActionDto) {
    if (!createUnsafeActionDto || !createUnsafeActionDto.uns_a_name) {
      return new HttpException(
        'El nombre de la acción insegura es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findUnsafeAction = await this.unsafeActionRepository.findOne({
      where: {
        uns_a_name: createUnsafeActionDto.uns_a_name,
        uns_a_status: true,
      },
    });

    if (findUnsafeAction) {
      return new HttpException(
        'la acción insegura ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const unsafeAction = this.unsafeActionRepository.create(
      createUnsafeActionDto,
    );
    await this.unsafeActionRepository.save(unsafeAction);

    return new HttpException(
      `¡La acción insegura ${unsafeAction.uns_a_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllUnsafeActions() {
    const unsafeAction = await this.unsafeActionRepository.find({
      where: { uns_a_status: true },
      order: { uns_a_name: 'ASC' },
    });

    if (unsafeAction.length === 0) {
      return new HttpException(
        'No se encontró la lista de acciones inseguras.',
        HttpStatus.NOT_FOUND,
      );
    }

    return unsafeAction;
  }

  async findOneUnsafeActions(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador de la acción insegura es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const unsafeAction = await this.unsafeActionRepository.findOne({
      where: { id, uns_a_status: true },
    });

    if (!unsafeAction) {
      return new HttpException(
        'No se encontró la acción insegura.',
        HttpStatus.NOT_FOUND,
      );
    }

    return unsafeAction;
  }

  async updateUnsafeAction(
    id: number,
    updateUnsafeActionDto: UpdateUnsafeActionDto,
  ) {
    if (!updateUnsafeActionDto) {
      return new HttpException(
        'Los datos para actualizar la acción insegura son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneUnsafeActions(id);
    const result = await this.unsafeActionRepository.update(
      id,
      updateUnsafeActionDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la acción insegura.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteUnsafeAction(id: number) {
    const unsafeActionFound = await this.unsafeActionRepository.findOneBy({
      id,
    });

    if (!unsafeActionFound) {
      return new HttpException(
        `Acción insegura no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.unsafeActionRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la acción insegura.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
