import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { PriorityService } from '../services/priority.service';
import { CreatePriorityDto } from '../dto/create-priority.dto';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { ApiTags } from '@nestjs/swagger';
import { Priority } from '../entities/priority.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('priority')
@Controller('priority')
@UseGuards(PermissionGuard)
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Post('/createPriority/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createPriority(@Body() createPriorityDto: CreatePriorityDto) {
    return this.priorityService.createPriority(createPriorityDto);
  }

  @Get('/listPriorities/')
  listPriorities() {
    return this.priorityService.findAllPriorities();
  }

  @Get('/findPriority/:id/')
  findPriority(@Param('id') id: number) {
    return this.priorityService.findOnePriority(id);
  }

  @Patch('/updatePriority/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateStatusPriority(
    @Param('id') id: number,
    @Body() updateStatusPriority: UpdatePriorityDto,
  ) {
    return this.priorityService.updateStatusPriority(id, updateStatusPriority);
  }

  @Delete('/deletePriority/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deletePriority(@Param('id') id: number) {
    return this.priorityService.deletePriority(id);
  }
}
