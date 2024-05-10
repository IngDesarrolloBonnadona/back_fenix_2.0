import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event as EventEntity} from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>
  ){}

  async create(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async findAll() {
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

  async findOne(id: number) {
    const event = await this.eventRepository.findOne({ where: { id } });
    
    if (!event) {
      throw new HttpException(
        'No se encontró el evento.',
        HttpStatus.NOT_FOUND,
      );
    }

    return event
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);

    if (!event) {
      throw new HttpException(
        'No se encontró el evento.',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(event, updateEventDto)

    event.updateAt = new Date();
    
    return await this.eventRepository.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);

    if (!event) {
      throw new HttpException(
        'No se encontró el evento.',
        HttpStatus.NOT_FOUND,
      );
    }

    event.deletedAt = new Date();
    event.eve_status = false;

    return await this.eventRepository.save(event);
  }
}
