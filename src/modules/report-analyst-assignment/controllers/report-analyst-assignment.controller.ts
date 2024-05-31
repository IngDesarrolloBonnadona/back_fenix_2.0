import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReportAnalystAssignmentService } from '../services/report-analyst-assignment.service';
import { CreateReportAnalystAssignmentDto } from '../dto/create-report-analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('report-analyst-assignment')
@Controller('report-analyst-assignment')
export class ReportAnalystAssignmentController {
  constructor(
    private readonly analystReporterService: ReportAnalystAssignmentService,
  ) {}

  @Post('assingAnalystReporter')
  createAnalystReporter(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
  ) {
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
    @Body() updateAnalystReporterDto: UpdateReportAnalystAssignmentDto,
  ) {
    return this.analystReporterService.updateAnalystReporter(
      id,
      updateAnalystReporterDto,
    );
  }

  @Delete('deleteAnalistReporter/:id')
  deleteAnalistReporter(@Param('id') id: number) {
    return this.analystReporterService.deleteAnalystReporter(id);
  }
}
