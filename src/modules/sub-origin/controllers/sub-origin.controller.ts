import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubOriginService } from '../services/sub-origin.service';
import { CreateSubOriginDto } from '../dto/create-sub-origin.dto';
import { UpdateSubOriginDto } from '../dto/update-sub-origin.dto';

@Controller('sub-origin')
export class SubOriginController {
  constructor(private readonly subOriginService: SubOriginService) {}

  @Post()
  create(@Body() createSubOriginDto: CreateSubOriginDto) {
    return this.subOriginService.create(createSubOriginDto);
  }

  @Get()
  findAll() {
    return this.subOriginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subOriginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubOriginDto: UpdateSubOriginDto) {
    return this.subOriginService.update(+id, updateSubOriginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subOriginService.remove(+id);
  }
}
