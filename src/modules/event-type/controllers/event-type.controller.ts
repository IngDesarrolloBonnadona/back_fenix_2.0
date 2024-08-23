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
import { EventTypeService } from '../services/event-type.service';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { UpdateEventTypeDto } from '../dto/update-event-type.dto';
import { EventType } from '../entities/event-type.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('event-type')
@Controller('event-type')
@UseGuards(PermissionGuard)
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post('/createEventType/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createEventType(@Body() createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeService.createEventType(createEventTypeDto);
  }

  @Post('/createEventTypeArray') //es para cargar datos masivos
  createEventTypeArray(@Body() createEventTypeDto: CreateEventTypeDto[]) {
    return this.eventTypeService.createEventTypesArray(createEventTypeDto);
  }

  @Get('/listEventTypes/')
  listEventTypes() {
    return this.eventTypeService.findAllEventTypes();
  }

  @Get('/findEventType/:id/')
  findEventType(@Param('id') id: number) {
    return this.eventTypeService.findOneEventType(id);
  }

  @Get('/findEvenTypeByCaseType/:caseTypeId')
  findEvenTypeByCaseType(
    @Param('caseTypeId') caseTypeId: number,
  ) {
    return this.eventTypeService.findEvenTypeByCaseType(caseTypeId);
  }

  @Patch('/updateEventType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateEventType(
    @Param('id') id: number,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
  ) {
    return this.eventTypeService.updateEventType(id, updateEventTypeDto);
  }

  @Delete('/deleteEventType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteEventType(@Param('id') id: number) {
    return this.eventTypeService.deleteEventType(id);
  }
}
