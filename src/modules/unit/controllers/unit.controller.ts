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
import { UnitService } from '../services/unit.service';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { Unit } from '../entities/unit.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { permissions } from 'src/utils/enums/permissions.enum';
import { Permission } from 'src/utils/decorators/permission.decorator';

@ApiTags('unit')
@Controller('unit')
@UseGuards(PermissionGuard)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post('/createUnit/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createUnit(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.createUnit(createUnitDto);
  }

  @Get('/listUnits/')
  listUnits() {
    return this.unitService.findAllUnits();
  }

  @Get('/findUnit/:id/')
  findUnit(@Param('id') id: number) {
    return this.unitService.findOneUnit(id);
  }

  // @Get('/findUnitByService/:serviceId')
  // findUnitByService(@Param('serviceId') serviceId: number) {
  //   return this.unitService.findUnitByService(serviceId);
  // }

  @Patch('/updateUnit/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateUnit(@Param('id') id: number, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.updateUnit(id, updateUnitDto);
  }

  @Delete('/deleteUnit/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteUnit(@Param('id') id: number) {
    return this.unitService.deleteUnit(id);
  }
}
