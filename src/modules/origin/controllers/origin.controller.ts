import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { OriginService } from '../services/origin.service';
import { CreateOriginDto } from '../dto/create-origin.dto';
import { UpdateOriginDto } from '../dto/update-origin.dto';
import { Origin } from '../entities/origin.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('origin')
@Controller('origin')
@UseGuards(PermissionGuard)
export class OriginController {
  constructor(private readonly originService: OriginService) {}

  @Post('/createOrigin/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createOrigin(@Body() createOriginDto: CreateOriginDto): Promise<HttpException> {
    return this.originService.createOrigin(createOriginDto);
  }

  @Get('/listOrigins/')
  listOrigins(): Promise<Origin[]> {
    return this.originService.findAllOrigins();
  }

  @Get('/findOrigin/:id/')
  findOrigin(@Param('id') id: number): Promise<Origin> {
    return this.originService.findOneOrigin(id);
  }

  @Patch('/updateOrigin/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateOrigin(@Param('id') id: number, @Body() updateOriginDto: UpdateOriginDto): Promise<HttpException> {
    return this.originService.updateOrigin(id, updateOriginDto);
  }

  @Delete('/deleteOrigin/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteOrigin(@Param('id') id: number): Promise<HttpException> {
    return this.originService.deleteOrigin(id);
  }
}
