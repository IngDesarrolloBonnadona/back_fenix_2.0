import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { MovementReportService } from '../services/movement-report.service';
import { CreateMovementReportDto } from '../dto/create-movement-report.dto';
import { UpdateMovementReportDto } from '../dto/update-movement-report.dto';
import { MovementReport } from '../entities/movement-report.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('movement-report')
@Controller('movement-report')
@UseGuards(PermissionGuard)
export class MovementReportController {
  constructor(private readonly movementReportService: MovementReportService) {}

  @Post('/createMovementReport/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createMovementReport(@Body() createMovementReportDto: CreateMovementReportDto): Promise<HttpException> {
    return this.movementReportService.createMovementReport(createMovementReportDto);
  }

  @Get('/listMovementReports/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  listMovementReport(): Promise<MovementReport[]> {
    return this.movementReportService.findAllMovementReports();
  }

  @Get('/findMovementReport/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  findMovementReport(@Param('id') id: number): Promise<MovementReport> {
    return this.movementReportService.findOneMovementReport(id);
  }

  @Patch('/updateMovementReport/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateMovementReport(@Param('id') id: number, @Body() updateMovementReportDto: UpdateMovementReportDto): Promise<HttpException> {
    return this.movementReportService.updateMovementReport(id, updateMovementReportDto);
  }

  @Delete('/deleteMovementReport/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteMovementReport(@Param('id') id: number): Promise<HttpException> {
    return this.movementReportService.deleteMovementReport(id);
  }
}
