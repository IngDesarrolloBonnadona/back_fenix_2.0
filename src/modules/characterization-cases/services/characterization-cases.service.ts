import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCharacterizationCaseDto } from '../dto/create-characterization-case.dto';
import { UpdateCharacterizationCaseDto } from '../dto/update-characterization-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterizationCase as CharacterizationCaseEntity } from '../entities/characterization-case.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterizationCasesService {
  constructor(
    @InjectRepository(CharacterizationCaseEntity)
    private readonly characterizationCaseRepository: Repository<CharacterizationCaseEntity>,
  ) {}

  async createCharacterization(
    createCharacterizationCaseDto: CreateCharacterizationCaseDto,
  ) {
    if (
      !createCharacterizationCaseDto ||
      !createCharacterizationCaseDto.cha_c_name
    ) {
      throw new HttpException(
        'El nombre de la caracterización de los casos es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findCharacterization =
      await this.characterizationCaseRepository.findOne({
        where: {
          cha_c_name: createCharacterizationCaseDto.cha_c_name,
          cha_c_status: true,
        },
      });

    if (findCharacterization) {
      throw new HttpException(
        'La caracterización de los casos ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const characterization = this.characterizationCaseRepository.create(
      createCharacterizationCaseDto,
    );

    await this.characterizationCaseRepository.save(characterization);

    return new HttpException(
      `¡La caracterización ${characterization.cha_c_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllCharacterizations() {
    const characterization = await this.characterizationCaseRepository.find({
      where: {
        cha_c_status: true,
      },
      order: {
        cha_c_name: 'ASC',
      },
    });

    if (characterization.length === 0) {
      throw new HttpException(
        'No se encontró la lista de caracterización de los casos',
        HttpStatus.NOT_FOUND,
      );
    }
    return characterization;
  }

  async findOneCharacterization(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la caracterización es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const characterization = await this.characterizationCaseRepository.findOne({
      where: { id, cha_c_status: true },
    });

    if (!characterization) {
      throw new HttpException(
        'No se encontró la caracterización de los casos',
        HttpStatus.NOT_FOUND,
      );
    }

    return characterization;
  }

  async updateCharacterization(
    id: number,
    updateCharacterizationCaseDto: UpdateCharacterizationCaseDto,
  ) {
    const characterization = await this.findOneCharacterization(id);
    const result = await this.characterizationCaseRepository.update(
      characterization.id,
      updateCharacterizationCaseDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la caracterización de los casos`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteCharacterization(id: number) {
    const characterization = await this.findOneCharacterization(id);
    const result = await this.characterizationCaseRepository.softDelete(
      characterization.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la caracterización de los casos`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
