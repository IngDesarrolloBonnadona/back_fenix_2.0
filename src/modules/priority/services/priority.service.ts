import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriorityDto } from '../dto/create-priority.dto';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority as PriorityEntity } from '../entities/priority.entity';
import { Repository } from 'typeorm';
import { SeverityClasificationService } from 'src/modules/severity-clasification/services/severity-clasification.service';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(PriorityEntity)
    private readonly priorityRepository: Repository<PriorityEntity>,

    private readonly severityClasificationService: SeverityClasificationService,
  ) {}

  async createPriority(createPriorityDto: CreatePriorityDto) {
    if (
      !createPriorityDto ||
      !createPriorityDto.prior_name ||
      !createPriorityDto.prior_severityclasif_id_fk ||
      !createPriorityDto.prior_responsetime
    ) {
      return new HttpException(
        'Algunos datos de prioridad son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.severityClasificationService.findOneSeverityClasification(
      createPriorityDto.prior_severityclasif_id_fk,
    );

    const FindPriority = await this.priorityRepository.findOne({
      where: {
        prior_name: createPriorityDto.prior_name,
        prior_status: true,
      },
    });

    if (FindPriority) {
      return new HttpException(
        'La prioridad ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const priority = this.priorityRepository.create(createPriorityDto);
    await this.priorityRepository.save(priority);

    return new HttpException(
      `¡La prioridad ${priority.prior_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllPriorities() {
    const priorities = await this.priorityRepository.find({
      where: {
        prior_status: true,
      },
      relations: {
        severityClasification: true,
      },
      order: {
        prior_name: 'ASC',
      },
    });

    if (priorities.length === 0) {
      return new HttpException(
        'No se encontró la lista de prioridades.',
        HttpStatus.NOT_FOUND,
      );
    }
    return priorities;
  }

  async findOnePriority(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador de prioridad es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const priority = await this.priorityRepository.findOne({
      where: { id, prior_status: true },
      relations: {
        severityClasification: true,
      },
    });

    if (!priority) {
      return new HttpException(
        'No se encontró la prioridad.',
        HttpStatus.NOT_FOUND,
      );
    }

    return priority;
  }

  async updateStatusPriority(
    id: number,
    updateStatusPriority: UpdatePriorityDto,
  ) {
    if (!updateStatusPriority) {
      return new HttpException(
        'Los datos para actualizar la prioridad son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOnePriority(id);
    const result = await this.priorityRepository.update(
      id,
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
      HttpStatus.OK,
    );
  }

  async deletePriority(id: number) {
    const priorityFound = await this.priorityRepository.findOneBy({ id });

    if (!priorityFound) {
      return new HttpException(
        `Prioridad no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND
      )
    }

    const result = await this.priorityRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la prioridad`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
