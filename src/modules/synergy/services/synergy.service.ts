import { Injectable } from '@nestjs/common';
import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { UpdateSynergyDto } from '../dto/update-synergy.dto';

@Injectable()
export class SynergyService {
  create(createSynergyDto: CreateSynergyDto) {
    return 'This action adds a new synergy';
  }

  findAll() {
    return `This action returns all synergy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} synergy`;
  }

  update(id: number, updateSynergyDto: UpdateSynergyDto) {
    return `This action updates a #${id} synergy`;
  }

  remove(id: number) {
    return `This action removes a #${id} synergy`;
  }
}
