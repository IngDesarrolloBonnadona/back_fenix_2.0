import { Injectable } from '@nestjs/common';
import { CreateCharacterizationCaseDto } from '../dto/create-characterization-case.dto';
import { UpdateCharacterizationCaseDto } from '../dto/update-characterization-case.dto';

@Injectable()
export class CharacterizationCasesService {
  create(createCharacterizationCaseDto: CreateCharacterizationCaseDto) {
    return 'This action adds a new characterizationCase';
  }

  findAll() {
    return `This action returns all characterizationCases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} characterizationCase`;
  }

  update(id: number, updateCharacterizationCaseDto: UpdateCharacterizationCaseDto) {
    return `This action updates a #${id} characterizationCase`;
  }

  remove(id: number) {
    return `This action removes a #${id} characterizationCase`;
  }
}
