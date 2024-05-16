import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MovementReportService } from '../services/movement-report.service';
import { CreateMovementReportDto } from '../dto/create-movement-report.dto';
import { UpdateMovementReportDto } from '../dto/update-movement-report.dto';
import { MovementReport } from '../entities/movement-report.entity';

@Controller('movement-report')
export class MovementReportController {
  constructor(private readonly movementReportService: MovementReportService) {}

  @Post('/createMovementReport')
  createMovementReport(@Body() createMovementReportDto: CreateMovementReportDto): Promise<MovementReport> {
    return this.movementReportService.createMovementReport(createMovementReportDto);
  }

  @Get('/listMovementReports')
  listMovementReport(): Promise<MovementReport[]> {
    return this.movementReportService.findAllMovementReports();
  }

  @Get('/findMovementReport/:id')
  findMovementReport(@Param('id') id: number): Promise<MovementReport> {
    return this.movementReportService.findOneMovementReport(id);
  }

  @Patch('/updateMovementReport/:id')
  updateMovementReport(@Param('id') id: number, @Body() updateMovementReportDto: UpdateMovementReportDto): Promise<MovementReport> {
    return this.movementReportService.updateMovementReport(id, updateMovementReportDto);
  }

  @Delete('/deleteMovementReport/:id')
  async deleteMovementReport(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.movementReportService.deleteMovementReport(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
