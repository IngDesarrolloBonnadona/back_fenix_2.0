import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('event')
@Controller('event')
@UseGuards(PermissionGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/createEvent/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Post('/createEventsArray') //es para cargar datos masivos
  createEventsArray(@Body() createEventDto: CreateEventDto[]) {
    return this.eventService.createEventsArray(createEventDto);
  }

  @Get('/listEvents/')
  listEvents() {
    return this.eventService.findAllEvents();
  }

  @Get('/findEvent/:id/')
  findEvent(@Param('id') id: number) {
    return this.eventService.findOneEvent(id);
  }

  @Get('/findEventsByEventTypeIdAndUnitId/:eventTypeId/:unitId?/')
  findEventsByEventTypeIdAndUnitId(
    @Param('eventTypeId') eventTypeId: number,
    @Param('unitId') unitId?: string,
  ) {
    const unitIdNumber = unitId ? parseInt(unitId, 10) : undefined;
    return this.eventService.findEventByEventTypeAndIdUnitId(
      eventTypeId,
      unitIdNumber,
    );
  }

  @Patch('/updateEvent/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateEvent(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete('/deleteEvent/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteEvent(@Param('id') id: number) {
    return this.eventService.deleteEvent(id);
  }
}
