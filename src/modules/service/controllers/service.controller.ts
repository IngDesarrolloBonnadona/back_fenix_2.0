import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/createService')
  createService(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.createService(createServiceDto);
  }

  @Get('/listServices')
  listServices() {
    return this.serviceService.findAllServices();
  }

  @Get('/findService/:id')
  findService(@Param('id') id: number) {
    return this.serviceService.findOneService(id);
  }

  @Patch('/updateService/:id')
  updateService(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.updateService(id, updateServiceDto);
  }

  @Delete('/deleteService/:id')
  async deleteService(@Param('id') id: number): Promise<{ message: string }> {
    return await this.serviceService.deleteService(id);
  }
}
