import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { EventTypeService } from '../services/event-type.service';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { UpdateEventTypeDto } from '../dto/update-event-type.dto';
import { EventType } from '../entities/event-type.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('event-type')
@Controller('event-type')
@UseGuards(PermissionGuard)
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post('/createEventType/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createEventType(@Body() createEventTypeDto: CreateEventTypeDto): Promise<HttpException> {
    return this.eventTypeService.createEventType(createEventTypeDto);
  }

  @Post('/createEventTypeArray')
  createEventTypeArray(@Body() createEventTypeDto: CreateEventTypeDto[]): Promise<HttpException> {
    return this.eventTypeService.createEventTypesArray(createEventTypeDto);
  }

  @Get('/listEventTypes/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  listEventTypes(): Promise<EventType[]> {
    return this.eventTypeService.findAllEventTypes();
  }

  @Get('/findEventType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  findEventType(@Param('id') id: number): Promise<EventType> {
    return this.eventTypeService.findOneEventType(id);
  }

  @Get('/findEvenTypeByCaseType/:caseTypeId')
  findEvenTypeByCaseType(@Param('caseTypeId') caseTypeId: number): Promise<EventType[]> {
    return this.eventTypeService.findEvenTypeByCaseType(caseTypeId);
  }

  @Patch('/updateEventType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateEventType(@Param('id') id: number, @Body() updateEventTypeDto: UpdateEventTypeDto): Promise<HttpException> {
    return this.eventTypeService.updateEventType(id, updateEventTypeDto);
  }

  @Delete('/deleteEventType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteEventType(@Param('id') id: number): Promise<HttpException> {
    return this.eventTypeService.deleteEventType(id);
  }
}
