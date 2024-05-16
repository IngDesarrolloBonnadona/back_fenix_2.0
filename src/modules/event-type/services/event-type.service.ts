import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { UpdateEventTypeDto } from '../dto/update-event-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType as EventTypeEntity } from '../entities/event-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectRepository(EventTypeEntity)
    private readonly eventTypeRepository: Repository<EventTypeEntity>
  ){}

  async createEventType(createEventTypeDto: CreateEventTypeDto) {
    const eventType = this.eventTypeRepository.create(createEventTypeDto);
    return await this.eventTypeRepository.save(eventType);
  }

  async findAllEventTypes() {
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

  async findOneEventType(id: number) {
    const eventType = await this.eventTypeRepository.findOne({ where: { id } });

    if (!eventType) {
      throw new HttpException(
        'No se encontró el tipo de reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    return eventType
  }

  async updateEventType(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    const eventType = await this.findOneEventType(id);

    Object.assign(eventType, updateEventTypeDto)

    eventType.updateAt= new Date();
    
    return await this.eventTypeRepository.save(eventType);
  }

  async deleteEventType(id: number) {
    const eventType = await this.findOneEventType(id);

    const result = await this.eventTypeRepository.softDelete(eventType.id);
    
    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el tipo de evento.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }  
    return { message: `El tipo de evento se eliminó correctamente`}
  }
}
