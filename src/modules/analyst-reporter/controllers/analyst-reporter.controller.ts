import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnalystReporterService } from '../services/analyst-reporter.service';
import { CreateAnalystReporterDto } from '../dto/create-analyst-reporter.dto';
import { UpdateAnalystReporterDto } from '../dto/update-analyst-reporter.dto';

@Controller('analyst-reporter')
export class AnalystReporterController {
  constructor(
    private readonly analystReporterService: AnalystReporterService,
  ) {}

  @Post()
  create(@Body() createAnalystReporterDto: CreateAnalystReporterDto) {
    return this.analystReporterService.create(createAnalystReporterDto);
  }

  @Get()
  findAll() {
    return this.analystReporterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analystReporterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnalystReporterDto: UpdateAnalystReporterDto,
  ) {
    return this.analystReporterService.update(+id, updateAnalystReporterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analystReporterService.remove(+id);
  }
}
