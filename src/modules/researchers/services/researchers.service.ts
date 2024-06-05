import { Injectable } from '@nestjs/common';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';

@Injectable()
export class ResearchersService {
  create(createResearcherDto: CreateResearcherDto) {
    return 'This action adds a new researcher';
  }

  findAll() {
    return `This action returns all researchers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} researcher`;
  }

  update(id: number, updateResearcherDto: UpdateResearcherDto) {
    return `This action updates a #${id} researcher`;
  }

  remove(id: number) {
    return `This action removes a #${id} researcher`;
  }
}
