import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType as EventTypeEntity } from './entities/event-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectRepository(EventTypeEntity)
    private readonly eventTypeRepository: Repository<EventTypeEntity>
  ){}

  async create(createEventTypeDto: CreateEventTypeDto) {
    const eventType = this.eventTypeRepository.create(createEventTypeDto);
    return await this.eventTypeRepository.save(eventType);
  }

  async findAll() {
    return await this.eventTypeRepository.find({
      relations: {
        event: true,
        caseType: true,
        caseReportOriginal: true,
      }
    });
  }

  async findOne(id: number) {
    return await this.eventTypeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    const eventType = await this.findOne(id);

    if (!eventType) {
      throw new NotFoundException();
    }

    Object.assign(eventType, updateEventTypeDto)

    eventType.tsuc_fecha_actualizacion= new Date();
    
    return await this.eventTypeRepository.save(eventType);
  }

  async remove(id: number) {
    const eventType = await this.findOne(id);

    if (!eventType) {
      throw new NotFoundException();
    }
    return await this.eventTypeRepository.remove(eventType);
  }
}
