import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriorityDto } from '../dto/create-priority.dto';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority as PriorityEntity } from '../entities/priority.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(PriorityEntity)
    private readonly priorityRepository: Repository<PriorityEntity>
  ) {}

  async createPriority(createPriorityDto: CreatePriorityDto) {
    const priority = this.priorityRepository.create(createPriorityDto);
    return await this.priorityRepository.save(priority);
  }

  async findAllPriorities() {
    const priorities = await this.priorityRepository.find({
      relations: {
        caseReportOriginal: true,
      },
    });

    if (priorities.length === 0) {
      throw new HttpException(
        'No se encontró la lista de prioridades.',
        HttpStatus.NO_CONTENT,
      );
    }
    return priorities;
  }

  async findOnePriority(id: number) {
    const priority = await this.priorityRepository.findOne({
      where: { id },
      relations: {
        caseReportOriginal: true,
      },
    });

    if (!priority) {
      throw new HttpException(
        'No se encontró la prioridad.',
        HttpStatus.NO_CONTENT,
      );
    }

    return priority;
  }

  updatePriority(id: number, updatePriorityDto: UpdatePriorityDto) {
    return `This action updates a #${id} priority`;
  }

  deletePriority(id: number) {
    return `This action removes a #${id} priority`;
  }
}
