import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service as ServiceEntity } from '../entities/service.entity';
import { Repository } from 'typeorm';
import { UnitService } from 'src/modules/unit/services/unit.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,

    private readonly unitService: UnitService,
  ) {}

  async createService(createServiceDto: CreateServiceDto) {
    if (
      !createServiceDto ||
      !createServiceDto.serv_name ||
      !createServiceDto.serv_unit_id_fk
    ) {
      return new HttpException(
        'Algunos datos del servicio son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const FindService = await this.serviceRepository.findOne({
      where: {
        serv_name: createServiceDto.serv_name,
        serv_unit_id_fk: createServiceDto.serv_unit_id_fk,
        serv_status: true,
      },
    });

    if (FindService) {
      return new HttpException(
        'El servicio ya existe con la unidad seleccionada.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.unitService.findOneUnit(createServiceDto.serv_unit_id_fk);

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
      },
      order: {
        serv_name: 'ASC',
      },
    });

    if (services.length === 0) {
      return new HttpException(
        'No se encontró la lista de servicios',
        HttpStatus.NOT_FOUND,
      );
    }
    return services;
  }

  async findOneService(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del servicio es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const service = await this.serviceRepository.findOne({
      where: { id, serv_status: true },
      relations: {
        unit: true,
      },
    });

    if (!service) {
      return new HttpException(
        'No se encontró el servicio',
        HttpStatus.NOT_FOUND,
      );
    }
    return service;
  }

  async updateService(id: number, updateServiceDto: UpdateServiceDto) {
    if (!updateServiceDto) {
      return new HttpException(
        'Los datos para actualizar el servicio son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneService(id);
    await this.unitService.findOneUnit(updateServiceDto.serv_unit_id_fk);

    const result = await this.serviceRepository.update(id, updateServiceDto);

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
    const serviceFound = await this.serviceRepository.findOneBy({ id });

    if (!serviceFound) {
      return new HttpException(
        `Servicio no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.serviceRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el servicio.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
