import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';

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

  @Patch('/updateEvent/:id')
  updateEvent(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete('/deleteEvent/:id')
  async deleteEvent(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.eventService.deleteEvent(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
