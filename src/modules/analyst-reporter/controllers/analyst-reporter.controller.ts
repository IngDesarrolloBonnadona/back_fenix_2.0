import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AnalystReporterService } from '../services/analyst-reporter.service';
import { CreateAnalystReporterDto } from '../dto/create-analyst-reporter.dto';
import { UpdateAnalystReporterDto } from '../dto/update-analyst-reporter.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('analyst-reporter')
@Controller('analyst-reporter')
export class AnalystReporterController {
  constructor(
    private readonly analystReporterService: AnalystReporterService,
  ) {}

  @Post('assingAnalystReporter')
  createAnalystReporter(@Body() createAnalystReporterDto: CreateAnalystReporterDto) {
    return this.analystReporterService.AssingAnalyst(createAnalystReporterDto);
  }

  @Get('listAnalistReporters')
  listAnalistReporters() {
    return this.analystReporterService.findAllAnalystReporter();
  }

  @Get('findAnalistReporter/:id')
  findAnalistReporter(@Param('id') id: number) {
    return this.analystReporterService.findOneAnalystReporter(id);
  }

  @Put('updateAnalistReporter/:id')
  updateAnalistReporter(
    @Param('id') id: number,
    @Body() updateAnalystReporterDto: UpdateAnalystReporterDto,
  ) {
    return this.analystReporterService.updateAnalystReporter(id, updateAnalystReporterDto);
  }

  @Delete('deleteAnalistReporter/:id')
  deleteAnalistReporter(@Param('id') id: number) {
    return this.analystReporterService.deleteAnalystReporter(id);
  }
}
