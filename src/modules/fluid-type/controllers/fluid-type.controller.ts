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
import { FluidTypeService } from '../services/fluid-type.service';
import { CreateFluidTypeDto } from '../dto/create-fluid-type.dto';
import { UpdateFluidTypeDto } from '../dto/update-fluid-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';
import { FluidType } from '../entities/fluid-type.entity';

@ApiTags('fluid-type')
@Controller('fluid-type')
@UseGuards(PermissionGuard)
export class FluidTypeController {
  constructor(private readonly fluidTypeService: FluidTypeService) {}

  @Post('/createFluidType/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createFluidType(
    @Body() createFluidTypeDto: CreateFluidTypeDto,
  ): Promise<HttpException> {
    return this.fluidTypeService.createFluidType(createFluidTypeDto);
  }

  @Get('/listFluidType/')
  listFluidType(): Promise<FluidType[]> {
    return this.fluidTypeService.findAllFluidTypes();
  }

  @Get('/findFluidTypes/:id/')
  findFluidTypes(@Param('id') id: number): Promise<FluidType> {
    return this.fluidTypeService.findOneFluidTypes(id);
  }

  @Patch('/updateFluidTypes/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateFluidTypes(
    @Param('id') id: number,
    @Body() updateFluidTypeDto: UpdateFluidTypeDto,
  ): Promise<HttpException> {
    return this.fluidTypeService.updateFluidTypes(id, updateFluidTypeDto);
  }

  @Delete('/deleteFluidTypes/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteFluidTypes(@Param('id') id: number): Promise<HttpException> {
    return this.fluidTypeService.deleteFluidTypes(id);
  }
}
