import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event as EventEntity} from '../entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>
  ){}

  async createEvent(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async findAllEvents() {
    const events = await this.eventRepository.find({
      relations: {
        eventType: true,
        caseReportOriginal: true
      }
    });

    if (!events) {
      throw new HttpException(
        'No se encontró la lista de eventos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return events
  }

  async findOneEvent(id: number) {
    const event = await this.eventRepository.findOne({ where: { id } });
    
    if (!event) {
      throw new HttpException(
        'No se encontró el evento.',
        HttpStatus.NOT_FOUND,
      );
    }

    return event
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
        `No se pudo eliminar el el evento`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }  

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
