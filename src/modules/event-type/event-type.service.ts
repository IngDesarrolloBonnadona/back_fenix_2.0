import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const eventTypes = await this.eventTypeRepository.find({
      relations: {
        event: true,
        caseType: true,
        caseReportOriginal: true,
      }
    });

    if (!eventTypes) {
      throw new HttpException(
        'No se encontró la lista de tipo de eventos.',
        HttpStatus.NOT_FOUND,
      );
    }
    return eventTypes
  }

  async findOne(id: number) {
    const eventType = await this.eventTypeRepository.findOne({ where: { id } });

    if (!eventType) {
      throw new HttpException(
        'No se encontró el tipo de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    return eventType
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    const eventType = await this.findOne(id);

    if (!eventType) {
      throw new HttpException(
        'No se encontró el tipo de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(eventType, updateEventTypeDto)

    eventType.tsuc_fecha_actualizacion= new Date();
    
    return await this.eventTypeRepository.save(eventType);
  }

  async remove(id: number) {
    const eventType = await this.findOne(id);

    if (!eventType) {
      throw new HttpException(
        'No se encontró el tipo de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    eventType.tsuc_fecha_eliminacion = new Date()
    eventType.tsuc_estado = false
    
    return await this.eventTypeRepository.save(eventType);
  }
}
