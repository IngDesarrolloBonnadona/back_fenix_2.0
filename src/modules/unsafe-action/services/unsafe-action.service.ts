import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUnsafeActionDto } from '../dto/create-unsafe-action.dto';
import { UpdateUnsafeActionDto } from '../dto/update-unsafe-action.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnsafeAction as UnsafeActionEntity } from '../entities/unsafe-action.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnsafeActionService {
  constructor(
    @InjectRepository(UnsafeActionEntity)
    private readonly unsafeActionRepository: Repository<UnsafeActionEntity>,
  ) {}

  async createUnsafeAction(createUnsafeActionDto: CreateUnsafeActionDto) {
    const findUnsafeAction = await this.unsafeActionRepository.findOne({
      where: {
        uns_a_name: createUnsafeActionDto.uns_a_name,
        uns_a_status: true,
      },
    });

    if (findUnsafeAction) {
      throw new HttpException(
        'la acción insegura ya existe.',
        HttpStatus.CONFLICT,
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
      throw new HttpException(
        'No se encontró la lista de acciones inseguras.',
        HttpStatus.NO_CONTENT,
      );
    }

    return unsafeAction;
  }

  async findOneUnsafeActions(id: number) {
    const unsafeAction = await this.unsafeActionRepository.findOne({
      where: { id, uns_a_status: true },
    });

    if (!unsafeAction) {
      throw new HttpException(
        'No se encontró la acción insegura.',
        HttpStatus.NO_CONTENT,
      );
    }

    return unsafeAction;
  }

  async updateUnsafeAction(
    id: number,
    updateUnsafeActionDto: UpdateUnsafeActionDto,
  ) {
    const unsafeAction = await this.findOneUnsafeActions(id);
    const result = await this.unsafeActionRepository.update(
      unsafeAction.id,
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
    const unsafeAction = await this.findOneUnsafeActions(id);
    const result = await this.unsafeActionRepository.softDelete(
      unsafeAction.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la acción insegura.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
