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

  async createPriority(
    createPriorityDto: CreatePriorityDto,
  ) {
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
      throw new HttpException('La prioridad ya existe.', HttpStatus.CONFLICT);
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

  async findOnePriority(id: number) {
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
