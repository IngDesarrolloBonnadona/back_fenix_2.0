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
import { EventTypeService } from 'src/modules/event-type/services/event-type.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,

    private readonly eventTypeService: EventTypeService,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const events = await this.eventRepository.findOne({
      where: {
        eve_name: createEventDto.eve_name,
        eve_eventtype_id_fk: createEventDto.eve_eventtype_id_fk,
        eve_unit_id_fk: createEventDto.eve_unit_id_fk,
        eve_status: true,
      },
    });

    if (events) {
      throw new HttpException(
        `El suceso ${events.eve_name} ya existe en el tipo de suceso seleccionado.`,
        HttpStatus.CONFLICT,
      );
    }

    await this.eventTypeService.findOneEventType(
      createEventDto.eve_eventtype_id_fk,
    );

    const event = this.eventRepository.create(createEventDto);
    await this.eventRepository.save(event);

    return new HttpException(
      `¡El suceso ${event.eve_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async createEventsArray(createEventDto: CreateEventDto[]) {
    const eventToCreate = [];

    for (const event of createEventDto) {
      const findEvent = await this.eventRepository.findOne({
        where: {
          eve_name: event.eve_name,
          eve_eventtype_id_fk: event.eve_eventtype_id_fk,
          eve_unit_id_fk: event.eve_unit_id_fk,
          eve_status: true,
        },
      });

      if (findEvent) {
        throw new HttpException(
          `El suceso ${event.eve_name} ya existe en el tipo de suceso seleccionado.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const newEvent = this.eventRepository.create(event);
      eventToCreate.push(newEvent);
    }

    await this.eventRepository.save(eventToCreate);

    return new HttpException(
      `¡Los sucesos se crearon correctamente ${eventToCreate.length}!`,
      HttpStatus.CREATED,
    );
  }

  async findAllEvents() {
    const events = await this.eventRepository.find({
      where: {
        eve_status: true,
      },
      // relations: {
      //   eventType: true,
      //   caseReportValidate: true,
      // },
      order: {
        eve_name: 'ASC',
      },
    });

    if (events.length === 0) {
      throw new HttpException(
        'No se encontró la lista de sucesos.',
        HttpStatus.NO_CONTENT,
      );
    }

    return events;
  }

  async findOneEvent(id: number) {
    const event = await this.eventRepository.findOne({
      where: { id, eve_status: true },
      // relations: {
      //   eventType: true,
      //   caseReportValidate: true,
      // },
    });

    if (!event) {
      throw new HttpException(
        'No se encontró el suceso.',
        HttpStatus.NO_CONTENT,
      );
    }

    return event;
  }

  async findEventByEventTypeAndIdUnitId(eventTypeId: number, unitId?: number) {
    const where: any = { eve_eventtype_id_fk: eventTypeId };

    if (unitId !== undefined) {
      where.eve_unit_id_fk = unitId;
    }

    where.eve_status = true;

    const events = await this.eventRepository.find({
      where,
      order: {
        eve_name: 'ASC',
      },
    });

    if (events.length === 0) {
      throw new HttpException(
        'No se encontró la lista de sucesos relacionados con el tipo de suceso.',
        HttpStatus.NO_CONTENT,
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
      HttpStatus.OK,
    );
  }

  async deleteEvent(id: number) {
    const event = await this.findOneEvent(id);
    const result = await this.eventRepository.softDelete(event.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el suceso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
