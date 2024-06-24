import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { UpdateEventTypeDto } from '../dto/update-event-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType as EventTypeEntity } from '../entities/event-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectRepository(EventTypeEntity)
    private readonly eventTypeRepository: Repository<EventTypeEntity>,
  ) {}

  async createEventType(
    createEventTypeDto: CreateEventTypeDto,
  ): Promise<EventTypeEntity> {
    const eventTypes = await this.eventTypeRepository.findOne({
      where: {
        eve_t_name: createEventTypeDto.eve_t_name,
        eve_t_casetype_id_FK: createEventTypeDto.eve_t_casetype_id_FK
      }
    });

    if (eventTypes) {
      throw new HttpException(
        'El tipo de suceso ya existe con el tipo de caso.',
        HttpStatus.NO_CONTENT,
      );
    }

    const eventType = this.eventTypeRepository.create(createEventTypeDto);
    return await this.eventTypeRepository.save(eventType);
  }

  async findAllEventTypes(): Promise<EventTypeEntity[]> {
    const eventTypes = await this.eventTypeRepository.find({
      relations: {
        event: true,
        // caseType: true,
        // caseReportValidate: true,
      },
    });

    if (eventTypes.length === 0) {
      throw new HttpException(
        'No se encontró la lista de tipo de sucesos.',
        HttpStatus.NO_CONTENT,
      );
    }
    return eventTypes;
  }

  async findOneEventType(id: number): Promise<EventTypeEntity> {
    const eventType = await this.eventTypeRepository.findOne({
      where: { id },
      relations: {
        event: true,
        // caseType: true,
        // caseReportValidate: true,
      },
    });

    if (!eventType) {
      throw new HttpException(
        'No se encontró el tipo de suceso.',
        HttpStatus.NO_CONTENT,
      );
    }

    return eventType;
  }

  async findEvenTypeByCaseType(caseTypeId: number) {
    const eventTypesByCaseType = await this.eventTypeRepository.find({
      where: {
        eve_t_casetype_id_FK: caseTypeId,
        eve_t_status: true,
      },
    });

    if (!eventTypesByCaseType) {
      throw new HttpException(
        'No se encontró el tipo de suceso relacionado al tipo de caso.',
        HttpStatus.NO_CONTENT,
      );
    }

    return eventTypesByCaseType;
  }

  async updateEventType(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    const eventType = await this.findOneEventType(id);
    const result = await this.eventTypeRepository.update(
      eventType.id,
      updateEventTypeDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tipo de suceso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteEventType(id: number) {
    const eventType = await this.findOneEventType(id);

    const result = await this.eventTypeRepository.softDelete(eventType.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de suceso.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
