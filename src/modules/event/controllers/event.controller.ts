import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('event')
@Controller('event')
@UseGuards(PermissionGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/createEvent/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createEvent(@Body() createEventDto: CreateEventDto): Promise<HttpException> {
    return this.eventService.createEvent(createEventDto);
  }

  @Post('/createEventsArray') //es para cargar datos masivos 
  createEventsArray(@Body() createEventDto: CreateEventDto[]){
    return this.eventService.createEventsArray(createEventDto);
  }

  @Get('/listEvents/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  listEvents(): Promise<Event[]> {
    return this.eventService.findAllEvents();
  }

  @Get('/findEvent/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  findEvent(@Param('id') id: number): Promise<Event> {
    return this.eventService.findOneEvent(id);
  }

  @Get('/findEventsByEventTypeId/:eventTypeId/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  findEventsByEventTypeId(@Param('eventTypeId') eventTypeId: number): Promise<Event[]> {
    return this.eventService.findEventByEventTypeId(eventTypeId );
  }

  @Patch('/updateEvent/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateEvent(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto): Promise<HttpException> {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete('/deleteEvent/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteEvent(@Param('id') id: number): Promise<HttpException> {
    return this.eventService.deleteEvent(id);
  }
}
