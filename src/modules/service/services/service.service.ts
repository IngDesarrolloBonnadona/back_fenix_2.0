import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service as ServiceEntity } from '../entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
  @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>
  ){}

  async createService(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(service);
  }

  async findAllServices() {
    const services = await this.serviceRepository.find({
      relations: {
        unit: true,
        caseReportOriginal: true
      }
    });

    if (!services || services.length === 0) {
      throw new HttpException(
        'No se encontró la lista de servicios',
        HttpStatus.NO_CONTENT,
      );
    }
    return services
  }

  async findOneService(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      throw new HttpException(
        'No se encontró el servicio',
        HttpStatus.NO_CONTENT,
      );
    }
    return service
  }

  async updateService(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOneService(id);
    const result = await this.serviceRepository.update(service.id, updateServiceDto);
    
    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el servicio`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }  

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
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
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
