import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { EventTypeService } from '../services/event-type.service';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { UpdateEventTypeDto } from '../dto/update-event-type.dto';
import { EventType } from '../entities/event-type.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event-type')
@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post('/createEventType')
  createEventType(@Body() createEventTypeDto: CreateEventTypeDto): Promise<HttpException> {
    return this.eventTypeService.createEventType(createEventTypeDto);
  }

  @Get('/listEventTypes')
  listEventTypes(): Promise<EventType[]> {
    return this.eventTypeService.findAllEventTypes();
  }

  @Get('/findEventType/:id')
  findEventType(@Param('id') id: number): Promise<EventType> {
    return this.eventTypeService.findOneEventType(id);
  }

  @Get('/findEvenTypeByCaseType/:caseTypeId')
  findEvenTypeByCaseType(@Param('caseTypeId') caseTypeId: number): Promise<EventType[]> {
    return this.eventTypeService.findEvenTypeByCaseType(caseTypeId);
  }

  @Patch('/updateEventType/:id')
  updateEventType(@Param('id') id: number, @Body() updateEventTypeDto: UpdateEventTypeDto): Promise<HttpException> {
    return this.eventTypeService.updateEventType(id, updateEventTypeDto);
  }

  @Delete('/deleteEventType/:id')
  deleteEventType(@Param('id') id: number): Promise<HttpException> {
    return this.eventTypeService.deleteEventType(id);
  }
}
