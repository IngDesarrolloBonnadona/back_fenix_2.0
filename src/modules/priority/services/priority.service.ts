import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriorityDto } from '../dto/create-priority.dto';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority as PriorityEntity } from '../entities/priority.entity';
import { Repository } from 'typeorm';
import { SeverityClasificationService } from 'src/modules/severity-clasification/services/severity-clasification.service';
import { SeverityClasification as SeverityClasificationEntity } from 'src/modules/severity-clasification/entities/severity-clasification.entity';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(PriorityEntity)
    private readonly priorityRepository: Repository<PriorityEntity>,
    @InjectRepository(SeverityClasificationEntity)
    private readonly severityClasificationRepository: Repository<SeverityClasificationEntity>,

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

    const findSeverityClasif = await this.severityClasificationRepository.findOne({
      where: { id: createPriorityDto.prior_severityclasif_id_fk, sev_c_status: true },
    });

    if (!findSeverityClasif) {
      return new HttpException(
        'No se encontró la clasificación de severidad.',
        HttpStatus.NOT_FOUND,
      );
    }

    const findPriority = await this.priorityRepository.findOne({
      where: [
        { prior_name: createPriorityDto.prior_name, prior_status: true },
        {
          prior_severityclasif_id_fk:
            createPriorityDto.prior_severityclasif_id_fk,
          prior_status: true,
        },
      ],
    });

    if (findPriority) {
      if (findPriority.prior_name === createPriorityDto.prior_name) {
        return new HttpException(
          'El nombre de la prioridad ya existe.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (
        findPriority.prior_severityclasif_id_fk ===
        createPriorityDto.prior_severityclasif_id_fk
      ) {
        return new HttpException(
          'La clasificación de severidad ya existe.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
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
        HttpStatus.NOT_FOUND,
      );
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
