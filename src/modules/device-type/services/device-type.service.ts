import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateDeviceTypeDto } from '../dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from '../dto/update-device-type.dto';

import { DeviceType } from '../entities/device-type.entity';

@Injectable()
export class DeviceTypeService {
  constructor(
    @InjectRepository(DeviceType)
    private readonly deviceTypeRepository: Repository<DeviceType>,
  ) {}
  async createDeviceType(createDeviceTypeDto: CreateDeviceTypeDto) {
    if (!createDeviceTypeDto || !createDeviceTypeDto.dev_t_name) {
      return new HttpException(
        'El nombre del tipo de dispositivo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findDeviceType = await this.deviceTypeRepository.findOne({
      where: { dev_t_name: createDeviceTypeDto.dev_t_name, dev_t_status: true },
    });

    if (findDeviceType) {
      return new HttpException(
        'El tipo de dispositivo ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const deviceType = this.deviceTypeRepository.create(createDeviceTypeDto);
    await this.deviceTypeRepository.save(deviceType);

    return new HttpException(
      `¡El tipo de dispositivo ${deviceType.dev_t_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllDeviceTypes() {
    const deviceTypes = await this.deviceTypeRepository.find({
      where: { dev_t_status: true },
      order: { dev_t_name: 'ASC' },
    });

    if (deviceTypes.length === 0) {
      return new HttpException(
        'No se encontró la lista de tipos de dispositivos.',
        HttpStatus.NOT_FOUND,
      );
    }
    return deviceTypes;
  }

  async findOneDeviceType(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del tipo de dispositivo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deviceType = await this.deviceTypeRepository.findOne({
      where: { id, dev_t_status: true },
    });

    if (!deviceType) {
      return new HttpException(
        'No se encontró el tipo de dispositivo.',
        HttpStatus.NOT_FOUND,
      );
    }
    return deviceType;
  }

  async updateDeviceType(id: number, updateDeviceTypeDto: UpdateDeviceTypeDto) {
    if (!updateDeviceTypeDto) {
      return new HttpException(
        'Los datos para actualizar el tipo de dispositivo son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneDeviceType(id);
    const result = await this.deviceTypeRepository.update(
      id,
      updateDeviceTypeDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tipo de dispositivo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteDeviceType(id: number) {
    const deviceTypeFound = await this.deviceTypeRepository.findOneBy({ id });

    if (!deviceTypeFound) {
      return new HttpException(
        `Tipo de dispositivo no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND
      )
    }

    const result = await this.deviceTypeRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de dispositivo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
