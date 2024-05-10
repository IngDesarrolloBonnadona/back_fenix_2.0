import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovementReportService } from '../services/movement-report.service';
import { CreateMovementReportDto } from '../dto/create-movement-report.dto';
import { UpdateMovementReportDto } from '../dto/update-movement-report.dto';

@Controller('movement-report')
export class MovementReportController {
  constructor(private readonly movementReportService: MovementReportService) {}

  @Post()
  create(@Body() createMovementReportDto: CreateMovementReportDto) {
    return this.movementReportService.create(createMovementReportDto);
  }

  @Get()
  findAll() {
    return this.movementReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovementReportDto: UpdateMovementReportDto) {
    return this.movementReportService.update(+id, updateMovementReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movementReportService.remove(+id);
  }
}
