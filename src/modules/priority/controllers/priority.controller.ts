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
} from '@nestjs/common';
import { PriorityService } from '../services/priority.service';
import { CreatePriorityDto } from '../dto/create-priority.dto';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateStatusPriorityDto } from '../dto/update-status-priority.dto';
import { Priority } from '../entities/priority.entity';

@ApiTags('priority')
@Controller('priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Post('/createPriority')
  createPriority(
    @Body() createPriorityDto: CreatePriorityDto,
  ): Promise<Priority> {
    return this.priorityService.createPriority(createPriorityDto);
  }

  @Get('/listPriorities')
  listPriorities(): Promise<Priority[]> {
    return this.priorityService.findAllPriorities();
  }

  @Get('/findPriority/:id')
  findPriority(@Param('id') id: number): Promise<Priority> {
    return this.priorityService.findOnePriority(id);
  }

  @Patch('/updatePriority/:id')
  updateStatusPriority(
    @Param('id') id: number,
    @Body() updateStatusPriorityDto: UpdateStatusPriorityDto,
  ): Promise<HttpException> {
    return this.priorityService.updateStatusPriority(
      id,
      updateStatusPriorityDto,
    );
  }

  @Delete('/deletePriority/:id')
  deletePriority(@Param('id') id: string): Promise<HttpException> {
    return this.priorityService.deletePriority(+id);
  }
}
