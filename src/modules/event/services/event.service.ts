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
import { EventType as EventTypeEntity } from 'src/modules/event-type/entities/event-type.entity';
import { Unit as UnitEntity } from 'src/modules/unit/entities/unit.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(EventTypeEntity)
    private readonly eventTypeRepository: Repository<EventTypeEntity>,
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    if (
      !createEventDto ||
      !createEventDto.eve_name ||
      !createEventDto.eve_eventtype_id_fk
    ) {
      return new HttpException(
        'Algunos datos del suceso son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findEvents = await this.eventRepository.findOne({
      where: {
        eve_name: createEventDto.eve_name,
        eve_eventtype_id_fk: createEventDto.eve_eventtype_id_fk,
        eve_status: true,
      },
    });

    if (findEvents) {
      return new HttpException(
        `El suceso ya existe en el tipo de suceso seleccionado.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const eventTypeFound = await this.eventTypeRepository.findOneBy({
      id: createEventDto.eve_eventtype_id_fk,
    });

    if (!eventTypeFound) {
      return new HttpException(
        `Estrategia no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (createEventDto.eve_unit_id_fk) {
      const unitFound = await this.unitRepository.findOneBy({
        id: createEventDto.eve_unit_id_fk,
      });

      if (!unitFound) {
        return new HttpException(`Unidad no encontrada.`, HttpStatus.NOT_FOUND);
      }
    }

    const event = this.eventRepository.create(createEventDto);
    await this.eventRepository.save(event);

    return new HttpException(
      `¡El suceso ${event.eve_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  // Se usa para parametrizar datos masivos
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
        return new HttpException(
          `El suceso ${event.eve_name} ya existe en el tipo de suceso seleccionado.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
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
      relations: {
        eventType: {
          caseType: true,
        },
        unit: true,
      },
      order: {
        eve_name: 'ASC',
      },
    });

    if (events.length === 0) {
      return new HttpException(
        'No se encontró la lista de sucesos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return events;
  }

  async findOneEvent(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del suceso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const event = await this.eventRepository.findOne({
      where: { id, eve_status: true },
    });

    if (!event) {
      return new HttpException(
        'No se encontró el suceso.',
        HttpStatus.NOT_FOUND,
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
      return new HttpException(
        'No se encontró la lista de sucesos relacionados con el tipo de suceso.',
        HttpStatus.NOT_FOUND,
      );
    }

    return events;
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto) {
    if (!updateEventDto) {
      return new HttpException(
        'Los datos para actualizar el suceso son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const eventTypeFound = await this.eventTypeRepository.findOneBy({
      id: updateEventDto.eve_eventtype_id_fk,
    });

    if (!eventTypeFound) {
      return new HttpException(
        `Estrategia no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const unitFound = await this.unitRepository.findOneBy({
      id: updateEventDto.eve_unit_id_fk,
    });

    if (!unitFound) {
      return new HttpException(`Unidad no encontrada.`, HttpStatus.NOT_FOUND);
    }

    const eventFound = await this.eventRepository.findOneBy({ id });

    if (!eventFound) {
      return new HttpException(`Suceso no encontrado.`, HttpStatus.NOT_FOUND);
    }

    const result = await this.eventRepository.update(id, updateEventDto);

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
    const eventFound = await this.eventRepository.findOneBy({ id });

    if (!eventFound) {
      return new HttpException(
        `Suceso no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.eventRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el suceso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
