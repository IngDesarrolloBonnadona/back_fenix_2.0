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
  ): Promise<CharacterizationCaseEntity> {
    const findCharacterization =
      await this.characterizationCaseRepository.findOne({
        where: {
          cha_c_name: createCharacterizationCaseDto.cha_c_name,
          cha_c_status: true,
        },
      });

    if (findCharacterization) {
      throw new HttpException(
        'La caracterización de los casos no existe.',
        HttpStatus.CONFLICT,
      );
    }
    const characterization = this.characterizationCaseRepository.create(
      createCharacterizationCaseDto,
    );
    return await this.characterizationCaseRepository.save(characterization);
  }

  async findAllCharacterizations() {
    const characterization = await this.characterizationCaseRepository.find({
      where: {
        cha_c_status: true,
      },
    });

    if (characterization.length === 0) {
      throw new HttpException(
        'No se encontró la lista de caracterización de los casos',
        HttpStatus.NO_CONTENT,
      );
    }
    return characterization;
  }

  async findOneCharacterization(id: number) {
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
      HttpStatus.ACCEPTED,
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

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
