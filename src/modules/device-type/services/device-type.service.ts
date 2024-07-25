import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeviceTypeDto } from '../dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from '../dto/update-device-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceType as DeviceTypeEntity } from '../entities/device-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceTypeService {
  constructor(
    @InjectRepository(DeviceTypeEntity)
    private readonly deviceTypeRepository: Repository<DeviceTypeEntity>,
  ) {}
  async createDeviceType(createDeviceTypeDto: CreateDeviceTypeDto) {
    const findDeviceType = await this.deviceTypeRepository.findOne({
      where: { dev_t_name: createDeviceTypeDto.dev_t_name, dev_t_status: true },
    });

    if (findDeviceType) {
      throw new HttpException(
        'El tipo de dispositivo ya existe.',
        HttpStatus.CONFLICT,
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
      throw new HttpException(
        'No se encontró la lista de tipos de dispositivos.',
        HttpStatus.NO_CONTENT,
      );
    }
    return deviceTypes;
  }

  async findOneDeviceType(id: number) {
    const deviceType = await this.deviceTypeRepository.findOne({
      where: { id, dev_t_status: true },
    });

    if (!deviceType) {
      throw new HttpException(
        'No se encontró el tipo de dispositivo.',
        HttpStatus.NO_CONTENT,
      );
    }
    return deviceType;
  }

  async updateDeviceType(id: number, updateDeviceTypeDto: UpdateDeviceTypeDto) {
    const deviceType = await this.findOneDeviceType(id);
    const result = await this.deviceTypeRepository.update(
      deviceType.id,
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
    const deviceType = await this.findOneDeviceType(id);
    const result = await this.deviceTypeRepository.softDelete(deviceType.id);
    
    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de dispositivo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
