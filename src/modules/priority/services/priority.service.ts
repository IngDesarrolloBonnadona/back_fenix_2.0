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
    private readonly priorityRepository: Repository<PriorityEntity>,
  ) {}

  async createPriority(
    createPriorityDto: CreatePriorityDto,
  ): Promise<PriorityEntity> {
    const FindPriority = await this.priorityRepository.findOne({
      where: {
        prior_name: createPriorityDto.prior_name,
        prior_status: true,
      },
    });

    if (FindPriority) {
      throw new HttpException('La prioridad ya existe.', HttpStatus.NO_CONTENT);
    }

    const priority = this.priorityRepository.create(createPriorityDto);
    return await this.priorityRepository.save(priority);
  }

  async findAllPriorities(): Promise<PriorityEntity[]> {
    const priorities = await this.priorityRepository.find({
      // relations: {
      //   caseReportValidate: true,
      // },
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

  async findOnePriority(id: number): Promise<PriorityEntity> {
    const priority = await this.priorityRepository.findOne({
      where: { id, prior_status: true },
      // relations: {
      //   caseReportValidate: true,
      // },
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
    updateStatusPriority: UpdatePriorityDto,
  ) {
    const priority = await this.findOnePriority(id);
    const result = await this.priorityRepository.update(
      priority.id,
      updateStatusPriority,
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
