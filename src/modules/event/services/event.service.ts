import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event as EventEntity } from '../entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<EventEntity> {
    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async findAllEvents(): Promise<EventEntity[]> {
    const events = await this.eventRepository.find({
      relations: {
        eventType: true,
        // caseReportValidate: true,
      },
    });

    if (events.length === 0) {
      throw new HttpException(
        'No se encontró la lista de eventos.',
        HttpStatus.NO_CONTENT,
      );
    }

    return events;
  }

  async findOneEvent(id: number): Promise<EventEntity> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: {
        eventType: true,
        // caseReportValidate: true,
      },
    });

    if (!event) {
      throw new HttpException(
        'No se encontró el evento.',
        HttpStatus.NO_CONTENT,
      );
    }

    return event;
  }

  async findEventByEventTypeId(eventTypeId: number): Promise<EventEntity[]> {
    const events = await this.eventRepository.find({
      where: { eve_eventtype_id_FK: eventTypeId },
    });

    if (events.length === 0) {
      throw new HttpException(
        'No se encontró la lista de eventos relacionados con el tipo de evento.',
        HttpStatus.NOT_FOUND,
      );
    }

    return events;
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOneEvent(id);
    const result = await this.eventRepository.update(event.id, updateEventDto);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el suceso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteEvent(id: number) {
    const event = await this.findOneEvent(id);
    const result = await this.eventRepository.softDelete(event.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el evento`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
