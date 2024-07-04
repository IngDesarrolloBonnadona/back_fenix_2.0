import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { Service } from '../entities/service.entity';

@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/createService')
  createService(@Body() createServiceDto: CreateServiceDto): Promise<HttpException> {
    return this.serviceService.createService(createServiceDto);
  }

  @Get('/listServices')
  listServices(): Promise<Service[]> {
    return this.serviceService.findAllServices();
  }

  @Get('/findService/:id')
  findService(@Param('id') id: number): Promise<Service> {
    return this.serviceService.findOneService(id);
  }

  @Patch('/updateService/:id')
  updateService(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto): Promise<HttpException> {
    return this.serviceService.updateService(id, updateServiceDto);
  }

  @Delete('/deleteService/:id')
  deleteService(@Param('id') id: number): Promise<HttpException> {
    return this.serviceService.deleteService(id);
  }
}
