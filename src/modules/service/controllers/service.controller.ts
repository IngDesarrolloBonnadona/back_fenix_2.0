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
import { ServiceService } from '../services/service.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { Service } from '../entities/service.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('service')
@Controller('service')
@UseGuards(PermissionGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/createService/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createService(
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<HttpException> {
    return this.serviceService.createService(createServiceDto);
  }

  @Get('/listServices/')
  listServices(): Promise<Service[] | HttpException> {
    return this.serviceService.findAllServices();
  }

  @Get('/findService/:id/')
  findService(@Param('id') id: number): Promise<Service | HttpException> {
    return this.serviceService.findOneService(id);
  }

  @Patch('/updateService/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateService(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<HttpException> {
    return this.serviceService.updateService(id, updateServiceDto);
  }

  @Delete('/deleteService/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteService(@Param('id') id: number): Promise<HttpException> {
    return this.serviceService.deleteService(id);
  }
}
