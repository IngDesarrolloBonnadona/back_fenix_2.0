import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FluidTypeService } from '../services/fluid-type.service';
import { CreateFluidTypeDto } from '../dto/create-fluid-type.dto';
import { UpdateFluidTypeDto } from '../dto/update-fluid-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('fluid-type')
@Controller('fluid-type')
@UseGuards(PermissionGuard)
export class FluidTypeController {
  constructor(private readonly fluidTypeService: FluidTypeService) {}

  @Post('/createFluidType/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createFluidType(@Body() createFluidTypeDto: CreateFluidTypeDto) {
    return this.fluidTypeService.createFluidType(createFluidTypeDto);
  }

  @Get('/listFluidType/')
  listFluidType() {
    return this.fluidTypeService.findAllFluidTypes();
  }

  @Get('/findFluidTypes/:id/')
  findFluidTypes(@Param('id') id: number) {
    return this.fluidTypeService.findOneFluidTypes(id);
  }

  @Patch('/updateFluidTypes/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateFluidTypes(@Param('id') id: number, @Body() updateFluidTypeDto: UpdateFluidTypeDto) {
    return this.fluidTypeService.updateFluidTypes(id, updateFluidTypeDto);
  }

  @Delete('/deleteFluidTypes/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteFluidTypes(@Param('id') id: number) {
    return this.fluidTypeService.deleteFluidTypes(id);
  }
}
