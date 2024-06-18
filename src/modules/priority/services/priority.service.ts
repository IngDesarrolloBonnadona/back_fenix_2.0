import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriorityDto } from '../dto/create-priority.dto';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority as PriorityEntity } from '../entities/priority.entity';
import { Repository } from 'typeorm';
import { UpdateStatusPriorityDto } from '../dto/update-status-priority.dto';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(PriorityEntity)
    private readonly priorityRepository: Repository<PriorityEntity>,
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
      where: {
        prior_status: true,
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
      where: { id, prior_status: true },
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

  async updateStatusPriority(
    id: number,
    updateStatusPriorityDto: UpdateStatusPriorityDto,
  ) {
    const priority = await this.findOnePriority(id);
    const result = await this.priorityRepository.update(
      priority.id,
      updateStatusPriorityDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el estado de la prioridad`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deletePriority(id: number) {
    const priority = await this.findOnePriority(id);
    const result = await this.priorityRepository.softDelete(priority.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la prioridad`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}