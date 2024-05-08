import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.eventRepository.find({
      relations: {
        eventType: true,
        caseReportOriginal: true
      }
    });
  }

  async findOne(id: number) {
    return await this.eventRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }

    Object.assign(event, updateEventDto)

    event.suc_fecha_actualizacion = new Date();
    
    return await this.eventRepository.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }
    return await this.eventRepository.remove(event);
  }
}
