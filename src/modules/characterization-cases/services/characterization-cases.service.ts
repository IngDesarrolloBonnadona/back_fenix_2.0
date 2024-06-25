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

  findAll() {
    return `This action returns all characterizationCases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} characterizationCase`;
  }

  update(
    id: number,
    updateCharacterizationCaseDto: UpdateCharacterizationCaseDto,
  ) {
    return `This action updates a #${id} characterizationCase`;
  }

  remove(id: number) {
    return `This action removes a #${id} characterizationCase`;
  }
}
