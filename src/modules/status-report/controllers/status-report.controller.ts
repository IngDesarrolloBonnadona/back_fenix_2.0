import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { StatusReportService } from '../services/status-report.service';
import { CreateStatusReportDto } from '../dto/create-status-report.dto';
import { UpdateStatusReportDto } from '../dto/update-status-report.dto';
import { StatusReport } from '../entities/status-report.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('status-report')
@Controller('status-report')
export class StatusReportController {
  constructor(private readonly statusReportService: StatusReportService) {}

  @Post('/createStatusReport')
  createStatusReport(@Body() createStatusReportDto: CreateStatusReportDto): Promise<StatusReport> {
    return this.statusReportService.createStatusReport(createStatusReportDto);
  }

  @Get('/listStatusReports')
  listStatusReports(): Promise<StatusReport[]> {
    return this.statusReportService.findAllStatusReports(
    );
  }

  @Get('/findOneStatusReport/:id')
  findOneStatusReport(@Param('id') id: number): Promise<StatusReport> {
    return this.statusReportService.findOneStatusReport(id);
  }

  @Patch('/updateStatusReport/:id')
  updateStatusReport(@Param('id') id: number, @Body() updateStatusReportDto: UpdateStatusReportDto): Promise<StatusReport> {
    return this.statusReportService.updateStatusReport(id, updateStatusReportDto);
  }

  @Delete('/deleteStatusReport/:id')
  async deleteStatusReport(@Param('id') id: number): Promise<{ message: string }> {
    return await this.statusReportService.deleteStatusReport(id);
  }
}
