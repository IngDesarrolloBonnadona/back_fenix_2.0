import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { UnitService } from '../services/unit.service';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { Unit } from '../entities/unit.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { permissions } from 'src/enums/permissions.enum';
import { Permission } from 'src/decorators/permission.decorator';

@ApiTags('unit')
@Controller('unit')
@UseGuards(PermissionGuard)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post('/createUnit/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createUnit(@Body() createUnitDto: CreateUnitDto): Promise<HttpException> {
    return this.unitService.createUnit(createUnitDto);
  }

  @Get('/listUnits/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  listUnits(): Promise<Unit[]> {
    return this.unitService.findAllUnits();
  }

  @Get('/findUnit/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  findUnit(@Param('id') id: number): Promise<Unit> {
    return this.unitService.findOneUnit(id);
  }

  @Get('/findUnitByService/:serviceId')
  findUnitByService(@Param('serviceId') serviceId: number): Promise<Unit[]> {
    return this.unitService.findUnitByService(serviceId);
  }

  @Patch('/updateUnit/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateUnit(@Param('id') id: number, @Body() updateUnitDto: UpdateUnitDto): Promise<HttpException> {
    return this.unitService.updateUnit(id, updateUnitDto);
  }

  @Delete('/deleteUnit/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteUnit(@Param('id') id: number): Promise<HttpException> {
    return this.unitService.deleteUnit(id);
  }
}
