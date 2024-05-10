import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusReportService } from '../services/status-report.service';
import { CreateStatusReportDto } from '../dto/create-status-report.dto';
import { UpdateStatusReportDto } from '../dto/update-status-report.dto';

@Controller('status-report')
export class StatusReportController {
  constructor(private readonly statusReportService: StatusReportService) {}

  @Post()
  create(@Body() createStatusReportDto: CreateStatusReportDto) {
    return this.statusReportService.create(createStatusReportDto);
  }

  @Get()
  findAll() {
    return this.statusReportService.findAll(
      
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusReportDto: UpdateStatusReportDto) {
    return this.statusReportService.update(+id, updateStatusReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusReportService.remove(+id);
  }
}
