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

  async createEventType(createEventTypeDto: CreateEventTypeDto): Promise<EventTypeEntity> {
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
        'No se encontró la lista de tipo de eventos.',
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
        'No se encontró el tipo de reporte.',
        HttpStatus.NO_CONTENT,
      );
    }

    return eventType;
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
        `No se pudo eliminar el tipo de evento.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
