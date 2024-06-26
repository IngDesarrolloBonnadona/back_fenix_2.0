import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/createEvent')
  createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }

  @Get('/listEvents')
  listEvents(): Promise<Event[]> {
    return this.eventService.findAllEvents();
  }

  @Get('/findEvent/:id')
  findEvent(@Param('id') id: number): Promise<Event> {
    return this.eventService.findOneEvent(id);
  }

  @Get('/findEventsByEventTypeId/:eventTypeId')
  findEventsByEventTypeId(@Param('eventTypeId') eventTypeId: number): Promise<Event[]> {
    return this.eventService.findEventByEventTypeId(eventTypeId );
  }

  @Patch('/updateEvent/:id')
  updateEvent(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto): Promise<HttpException> {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete('/deleteEvent/:id')
  deleteEvent(@Param('id') id: number): Promise<HttpException> {
    return this.eventService.deleteEvent(id);
  }
}
