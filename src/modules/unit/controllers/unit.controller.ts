import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { UnitService } from '../services/unit.service';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { Unit } from '../entities/unit.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('unit')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post('/createUnit')
  createUnit(@Body() createUnitDto: CreateUnitDto): Promise<Unit> {
    return this.unitService.createUnit(createUnitDto);
  }

  @Get('/listUnits')
  listUnits(): Promise<Unit[]> {
    return this.unitService.findAllUnits();
  }

  @Get('/findUnit/:id')
  findUnit(@Param('id') id: number): Promise<Unit> {
    return this.unitService.findOneUnit(id);
  }

  @Get('/findUnitByService/:serviceId')
  findUnitByService(@Param('serviceId') serviceId: number): Promise<Unit[]> {
    return this.unitService.findUnitByService(serviceId);
  }

  @Patch('/updateUnit/:id')
  updateUnit(@Param('id') id: number, @Body() updateUnitDto: UpdateUnitDto): Promise<HttpException> {
    return this.unitService.updateUnit(id, updateUnitDto);
  }

  @Delete('/deleteUnit/:id')
  deleteUnit(@Param('id') id: number): Promise<HttpException> {
    return this.unitService.deleteUnit(id);
  }
}
