import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { SubOriginService } from '../services/sub-origin.service';
import { CreateSubOriginDto } from '../dto/create-sub-origin.dto';
import { UpdateSubOriginDto } from '../dto/update-sub-origin.dto';
import { SubOrigin } from '../entities/sub-origin.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('sub-origin')
@Controller('sub-origin')
@UseGuards(PermissionGuard)
export class SubOriginController {
  constructor(private readonly subOriginService: SubOriginService) {}

  @Post('/createSubOrigin/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createSubOrigin(@Body() createSubOriginDto: CreateSubOriginDto): Promise<HttpException> {
    return this.subOriginService.createSubOrigin(createSubOriginDto);
  }

  @Get('/listSubOrigins/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  listSubOrigins(): Promise<SubOrigin[]> {
    return this.subOriginService.findAllSubOrigins();
  }

  @Get('/findSubOrigin/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  findSubOrigin(@Param('id') id: number): Promise<SubOrigin> {
    return this.subOriginService.findOneSubOrigin(id);
  }

  @Get('/findSubOriginByOriginId/:originId')
  findSubOriginByOriginId(@Param('originId') originId: number): Promise<SubOrigin[]> {
    return this.subOriginService.findSubOriginByOriginId(originId);
  }

  @Patch('/updateSubOrigin/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateSubOrigin(@Param('id') id: number, @Body() updateSubOriginDto: UpdateSubOriginDto): Promise<HttpException> {
    return this.subOriginService.updateSubOrigin(id, updateSubOriginDto);
  }

  @Delete('/deleteSubOrigin/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteSubOrigin(@Param('id') id: number): Promise<HttpException> {
    return this.subOriginService.deleteSubOrigin(id);
  }
}
