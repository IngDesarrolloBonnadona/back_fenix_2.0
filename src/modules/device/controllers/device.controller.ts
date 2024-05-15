import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { Device } from '../entities/device.entity';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('/createDevice')
  createDevice(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.deviceService.createDevice(createDeviceDto);
  }

  @Get('/listDevice')
  listDevice(): Promise<Device[]> {
    return this.deviceService.findAllDevices();
  }

  @Get('/findDevice/:id')
  findDevice(@Param('id') id: number): Promise<Device> {
    return this.deviceService.findOneDevice(id);
  }

  @Patch('/updateDevice/:id')
  updateDevice(
    @Param('id') id: number,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device> {
    return this.deviceService.updateDevice(id, updateDeviceDto);
  }

  @Delete('/deleteDevice/:id')
  deleteDevice(@Param('id') id: number): Promise<any> {
    return this.deviceService.deleteDevice(id);
  }
}
