import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
  Query,
} from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { Device } from '../entities/device.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('/listDevice')
  listDevice() {
    return this.deviceService.findAllDevices();
  }

  @Get('/findDevice/:id')
  findDevice(@Param('id') id: number) {
    return this.deviceService.findOneDevice(id);
  }

  @Get('/findExternalDevice')
  async findExternalMedicine(@Query('device') device: string) {
    return this.deviceService.findExternalDevicesQuery(device)
  }

  @Patch('/updateDevice/:id')
  updateDevice(
    @Param('id') id: number,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.deviceService.updateDevice(id, updateDeviceDto);
  }

  @Delete('/deleteDevice/:id')
  deleteDevice(@Param('id') id: number) {
    return this.deviceService.deleteDevice(id);
  }
}
