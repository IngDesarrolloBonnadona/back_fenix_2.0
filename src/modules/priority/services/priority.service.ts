import { Injectable } from '@nestjs/common';
import { CreatePriorityDto } from '../dto/create-priority.dto';
import { UpdatePriorityDto } from '../dto/update-priority.dto';

@Injectable()
export class PriorityService {
  createPriority(createPriorityDto: CreatePriorityDto) {
    return 'This action adds a new priority';
  }

  findAllPriorities() {
    return `This action returns all priority`;
  }

  findOnePriority(id: number) {
    return `This action returns a #${id} priority`;
  }

  updatePriority(id: number, updatePriorityDto: UpdatePriorityDto) {
    return `This action updates a #${id} priority`;
  }

  deletePriority(id: number) {
    return `This action removes a #${id} priority`;
  }
}
