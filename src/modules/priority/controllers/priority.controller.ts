import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PriorityService } from '../services/priority.service';
import { CreatePriorityDto } from '../dto/create-priority.dto';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('priority')
@Controller('priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Post('/createPriority')
  createPriority(@Body() createPriorityDto: CreatePriorityDto) {
    return this.priorityService.createPriority(createPriorityDto);
  }

  @Get('/listPriorities')
  listPriorities() {
    return this.priorityService.findAllPriorities();
  }

  @Get('/findPriority/:id')
  findPriority(@Param('id') id: number) {
    return this.priorityService.findOnePriority(id);
  }

  @Put('/updatePriority/:id')
  updatePriority(
    @Param('id') id: number,
    @Body() updatePriorityDto: UpdatePriorityDto,
  ) {
    return this.priorityService.updatePriority(id, updatePriorityDto);
  }

  @Delete('/deletePriority/:id')
  deletePriority(@Param('id') id: string) {
    return this.priorityService.deletePriority(+id);
  }
}
