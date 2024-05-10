import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device as DeviceEntity } from '../entities/device.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>
  ){}

  async create(createDeviceDto: CreateDeviceDto) {
    const device = this.deviceRepository.create(createDeviceDto);
    return await this.deviceRepository.save(device);
  }

  async findAll() {
    const devices = await this.deviceRepository.find();

    if (!devices) {
      throw new HttpException(
        'No se encontró la lista de dispositivos',
        HttpStatus.NOT_FOUND,
      );
    }

    return devices
  }

  async findOne(id: number) {
    const device = await this.deviceRepository.findOne({ where: { id } })

    if (!device) {
      throw new HttpException(
        'No se encontró el dispositivo',
        HttpStatus.NOT_FOUND,
      );
    }

    return device;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.findOne(id);

    if (!device) {
      throw new HttpException(
        'No se encontró el dispositivo',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(device, updateDeviceDto)

    device.updateAt = new Date();
    
    return await this.deviceRepository.save(device);
  }

  async remove(id: number) {
    const device = await this.findOne(id);

    if (!device) {
      throw new HttpException(
        'No se encontró el dispositivo',
        HttpStatus.NOT_FOUND,
      );
    }

    device.deletedAt = new Date();
    device.dev_status = false;

    return await this.deviceRepository.save(device)
  }
}
