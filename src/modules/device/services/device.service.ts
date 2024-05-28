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

  async createDeviceTransation(
    devices: CreateDeviceDto[],
    caseId: string,
    queryRunner: any,
  ) {
    
    for (const device of devices) {
      const dev = this.deviceRepository.create({
        ...device,
        dev_case_id_fk: caseId,
      });

      await queryRunner.manager.save(dev);
    }
  }

  async createDevice(createDeviceDto: CreateDeviceDto) {
    const device = this.deviceRepository.create(createDeviceDto);
    return await this.deviceRepository.save(device);
  }

  async findAllDevices() {
    const devices = await this.deviceRepository.find();

    if (!devices) {
      throw new HttpException(
        'No se encontró la lista de dispositivos',
        HttpStatus.NOT_FOUND,
      );
    }

    return devices
  }

  async findOneDevice(id: number) {
    const device = await this.deviceRepository.findOne({ where: { id } })

    if (!device) {
      throw new HttpException(
        'No se encontró el dispositivo',
        HttpStatus.NOT_FOUND,
      );
    }

    return device;
  }

  async updateDevice(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.findOneDevice(id);
    const result = await this.deviceRepository.update(device.id, updateDeviceDto);
    
    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el dispositivo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }  

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteDevice(id: number) {
    const device = await this.findOneDevice(id);
    const result = await this.deviceRepository.softDelete(device.id)
    
    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el dispositivo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
