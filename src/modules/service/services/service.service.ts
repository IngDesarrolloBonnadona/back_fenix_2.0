import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service, Service as ServiceEntity } from '../entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async createService(createServiceDto: CreateServiceDto) {
    const FindService = await this.serviceRepository.findOne({
      where: {
        serv_name: createServiceDto.serv_name,
        serv_status: true,
      },
    });

    if (FindService) {
      throw new HttpException('El  servicio ya existe.', HttpStatus.CONFLICT);
    }

    const service = this.serviceRepository.create(createServiceDto);
    await this.serviceRepository.save(service);

    return new HttpException(
      `¡El servicio ${service.serv_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllServices() {
    const services = await this.serviceRepository.find({
      where: {
        serv_status: true,
      },
      relations: {
        unit: true,
        // caseReportValidate: true,
      },
      order: {
        serv_name: 'ASC',
      },
    });

    if (services.length === 0) {
      throw new HttpException(
        'No se encontró la lista de servicios',
        HttpStatus.NO_CONTENT,
      );
    }
    return services;
  }

  async findOneService(id: number) {
    const service = await this.serviceRepository.findOne({
      where: { id, serv_status: true },
      relations: {
        unit: true,
        // caseReportValidate: true,
      },
    });

    if (!service) {
      throw new HttpException(
        'No se encontró el servicio',
        HttpStatus.NO_CONTENT,
      );
    }
    return service;
  }

  async updateService(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOneService(id);
    const result = await this.serviceRepository.update(
      service.id,
      updateServiceDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el servicio`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteService(id: number) {
    const service = await this.findOneService(id);
    const result = await this.serviceRepository.softDelete(service.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el servicio.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
