import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeverityClasificationService } from './severity-clasification.service';
import { CreateSeverityClasificationDto } from './dto/create-severity-clasification.dto';
import { UpdateSeverityClasificationDto } from './dto/update-severity-clasification.dto';

@Controller('severity-clasification')
export class SeverityClasificationController {
  constructor(private readonly severityClasificationService: SeverityClasificationService) {}

  @Post()
  create(@Body() createSeverityClasificationDto: CreateSeverityClasificationDto) {
    return this.severityClasificationService.create(createSeverityClasificationDto);
  }

  @Get()
  findAll() {
    return this.severityClasificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.severityClasificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeverityClasificationDto: UpdateSeverityClasificationDto) {
    return this.severityClasificationService.update(+id, updateSeverityClasificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.severityClasificationService.remove(+id);
  }
}
