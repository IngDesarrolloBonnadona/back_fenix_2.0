import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { UpdateEventTypeDto } from '../dto/update-event-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType as EventTypeEntity } from '../entities/event-type.entity';
import { Repository } from 'typeorm';
import { CaseTypeService } from 'src/modules/case-type/services/case-type.service';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectRepository(EventTypeEntity)
    private readonly eventTypeRepository: Repository<EventTypeEntity>,

    private readonly caseTypeService: CaseTypeService,
  ) {}

  async createEventType(createEventTypeDto: CreateEventTypeDto) {
    if (
      !createEventTypeDto ||
      !createEventTypeDto.eve_t_name ||
      !createEventTypeDto.eve_t_casetype_id_fk
    ) {
      return new HttpException(
        'Algunos datos del tipo de suceso son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findEventType = await this.eventTypeRepository.findOne({
      where: {
        eve_t_name: createEventTypeDto.eve_t_name,
        eve_t_casetype_id_fk: createEventTypeDto.eve_t_casetype_id_fk,
      },
    });

    if (findEventType) {
      return new HttpException(
        'El tipo de suceso ya existe con el tipo de caso seleccionado.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.caseTypeService.findOneCaseType(
      createEventTypeDto.eve_t_casetype_id_fk,
    );

    const eventType = this.eventTypeRepository.create(createEventTypeDto);
    await this.eventTypeRepository.save(eventType);

    return new HttpException(
      `¡El tipo de suceso ${eventType.eve_t_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  // Solo se usa para parametrizar cargando datos masivos
  async createEventTypesArray(createEventTypeDto: CreateEventTypeDto[]) {
    const eventTypesToCreate = [];

    for (const eventType of createEventTypeDto) {
      const findEventType = await this.eventTypeRepository.findOne({
        where: {
          eve_t_name: eventType.eve_t_name,
          eve_t_casetype_id_fk: eventType.eve_t_casetype_id_fk,
        },
      });

      if (findEventType) {
        return new HttpException(
          `El tipo de suceso ${eventType.eve_t_name} ya existe en el tipo de caso seleccionado.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await this.caseTypeService.findOneCaseType(
        eventType.eve_t_casetype_id_fk,
      );

      const newEventType = this.eventTypeRepository.create(eventType);
      eventTypesToCreate.push(newEventType);
    }

    await this.eventTypeRepository.save(eventTypesToCreate);

    return new HttpException(
      `¡Los tipos de suceso se crearon correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllEventTypes() {
    const eventTypes = await this.eventTypeRepository.find({
      where: {
        eve_t_status: true,
      },
      relations: {
        event: true,
        caseType: true,
      },
      order: {
        eve_t_name: 'ASC',
      },
    });

    if (eventTypes.length === 0) {
      return new HttpException(
        'No se encontró la lista de tipo de sucesos.',
        HttpStatus.NOT_FOUND,
      );
    }
    return eventTypes;
  }

  async findOneEventType(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del tipo de suceso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const eventType = await this.eventTypeRepository.findOne({
      where: { id, eve_t_status: true },
      relations: {
        event: true,
        caseType: true,
      },
    });

    if (!eventType) {
      return new HttpException(
        'No se encontró el tipo de suceso.',
        HttpStatus.NOT_FOUND,
      );
    }

    return eventType;
  }

  async findEvenTypeByCaseType(caseTypeId: number) {
    if (!caseTypeId) {
      return new HttpException(
        'El identificador del tipo de caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const eventTypesByCaseType = await this.eventTypeRepository.find({
      where: {
        eve_t_casetype_id_fk: caseTypeId,
        eve_t_status: true,
      },
      order: {
        eve_t_name: 'ASC',
      },
    });

    if (!eventTypesByCaseType) {
      return new HttpException(
        'No se encontró el tipo de suceso relacionado al tipo de caso.',
        HttpStatus.NOT_FOUND,
      );
    }

    return eventTypesByCaseType;
  }

  async updateEventType(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    if (!updateEventTypeDto) {
      return new HttpException(
        'Los datos para actualizar el tipo de suceso son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneEventType(id);
    await this.caseTypeService.findOneCaseType(
      updateEventTypeDto.eve_t_casetype_id_fk,
    );

    const result = await this.eventTypeRepository.update(
      id,
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
      HttpStatus.OK,
    );
  }

  async deleteEventType(id: number) {
    const eventTypeFound = await this.eventTypeRepository.findOneBy({ id });

    if (!eventTypeFound) {
      return new HttpException(
        `Estrategia no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND
      )
    }

    const result = await this.eventTypeRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de suceso.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
