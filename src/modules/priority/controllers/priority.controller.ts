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
import { Priority } from '../entities/priority.entity';

@ApiTags('priority')
@Controller('priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Post('/createPriority')
  createPriority(
    @Body() createPriorityDto: CreatePriorityDto,
  ): Promise<HttpException> {
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
    @Body() updateStatusPriority: UpdatePriorityDto,
  ): Promise<HttpException> {
    return this.priorityService.updateStatusPriority(
      id,
      updateStatusPriority,
    );
  }

  @Delete('/deletePriority/:id')
  deletePriority(@Param('id') id: number): Promise<HttpException> {
    return this.priorityService.deletePriority(id);
  }
}
