import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device as DeviceEntity } from '../entities/device.entity';
import { QueryRunner, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
  ) {}

  async createDeviceTransation(
    devices: CreateDeviceDto[],
    caseId: string,
    queryRunner: QueryRunner,
  ) {
    const existingDevice = await this.deviceRepository.find({
      where: { dev_case_id_fk: caseId },
    });

    if (existingDevice.length > 0) {
      await queryRunner.manager.remove(existingDevice);
    }

    for (const device of devices) {
      const dev = this.deviceRepository.create({
        ...device,
        dev_case_id_fk: caseId,
      });

      await queryRunner.manager.save(dev);
    }
  }

  async createDevice(createDeviceDto: CreateDeviceDto): Promise<DeviceEntity> {
    const device = this.deviceRepository.create(createDeviceDto);
    return await this.deviceRepository.save(device);
  }

  async findAllDevices(): Promise<DeviceEntity[]> {
    const devices = await this.deviceRepository.find({
      relations: {
        caseReportOriginal: true,
      },
    });

    if (devices.length === 0) {
      throw new HttpException(
        'No se encontró la lista de dispositivos',
        HttpStatus.NO_CONTENT,
      );
    }

    return devices;
  }

  async findOneDevice(id: number): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findOne({
      where: { id },
      relations: {
        caseReportOriginal: true,
      },
    });

    if (!device) {
      throw new HttpException(
        'No se encontró el dispositivo',
        HttpStatus.NO_CONTENT,
      );
    }

    return device;
  }

  async updateDevice(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.findOneDevice(id);
    const result = await this.deviceRepository.update(
      device.id,
      updateDeviceDto,
    );

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
    const result = await this.deviceRepository.softDelete(device.id);

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

  async deleteDevicesByCaseId(caseId: string) {
    const findListDevices = await this.deviceRepository.find({
      where: {
        dev_case_id_fk: caseId,
      },
    });

    if (findListDevices.length > 0) {
      for (const device of findListDevices) {
        const result = await this.deviceRepository.softDelete(device.id);

        if (result.affected === 0) {
          return new HttpException(
            `No se pudo eliminar el dispositivo.`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
      return 
    }
  }
}
