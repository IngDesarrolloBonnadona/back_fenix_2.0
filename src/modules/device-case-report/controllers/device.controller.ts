import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DeviceService } from '../services/device.service';
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

  @Delete('/deleteDevice/:id')
  deleteDevice(@Param('id') id: number) {
    return this.deviceService.deleteDevice(id);
  }
}
