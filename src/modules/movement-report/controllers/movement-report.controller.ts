import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MovementReportService } from '../services/movement-report.service';
import { CreateMovementReportDto } from '../dto/create-movement-report.dto';
import { UpdateMovementReportDto } from '../dto/update-movement-report.dto';
import { MovementReport } from '../entities/movement-report.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('movement-report')
@Controller('movement-report')
@UseGuards(PermissionGuard)
export class MovementReportController {
  constructor(private readonly movementReportService: MovementReportService) {}

  @Post('/createMovementReport/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  createMovementReport(
    @Body() createMovementReportDto: CreateMovementReportDto,
  ) {
    return this.movementReportService.createMovementReport(
      createMovementReportDto,
    );
  }

  @Get('/listMovementReports/')
  listMovementReport() {
    return this.movementReportService.findAllMovementReports();
  }

  @Get('/findMovementReport/:id/')
  findMovementReport(@Param('id') id: number) {
    return this.movementReportService.findOneMovementReport(id);
  }

  @Patch('/updateMovementReport/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  updateMovementReport(
    @Param('id') id: number,
    @Body() updateMovementReportDto: UpdateMovementReportDto,
  ) {
    return this.movementReportService.updateMovementReport(
      id,
      updateMovementReportDto,
    );
  }

  @Delete('/deleteMovementReport/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  deleteMovementReport(@Param('id') id: number) {
    return this.movementReportService.deleteMovementReport(id);
  }
}
