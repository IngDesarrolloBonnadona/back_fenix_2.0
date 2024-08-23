import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { DamageTypeService } from '../services/damage-type.service';
import { CreateDamageTypeDto } from '../dto/create-damage-type.dto';
import { UpdateDamageTypeDto } from '../dto/update-damage-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';
import { DamageType } from '../entities/damage-type.entity';

@ApiTags('damage-type')
@Controller('damage-type')
@UseGuards(PermissionGuard)
export class DamageTypeController {
  constructor(private readonly damageTypeService: DamageTypeService) {}

  @Post('/createDamageType/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createDamageType(
    @Body() createDamageTypeDto: CreateDamageTypeDto,
  ) {
    return this.damageTypeService.createDamageType(createDamageTypeDto);
  }

  @Get('/listDamageTypes/')
  listDamageTypes() {
    return this.damageTypeService.findAllDamageType();
  }

  @Get('/findDamageType/:id')
  findDamageType(@Param('id') id: number) {
    return this.damageTypeService.findOneDamageType(id);
  }

  @Patch('/updateDamageType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateDamageType(
    @Param('id') id: number,
    @Body() updateDamageTypeDto: UpdateDamageTypeDto,
  ) {
    return this.damageTypeService.updateDamageType(id, updateDamageTypeDto);
  }

  @Delete('/deleteDamageType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteDamageType(@Param('id') id: number) {
    return this.damageTypeService.deleteDamageType(id);
  }
}
