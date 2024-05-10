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

  async create(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(service);
  }

  async findAll() {
    const services = await this.serviceRepository.find({
      relations: {
        unit: true,
        caseReportOriginal: true
      }
    });

    if (!services) {
      throw new HttpException(
        'No se encontró la lista de servicios',
        HttpStatus.NOT_FOUND,
      );
    }

    return services
  }

  async findOne(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      throw new HttpException(
        'No se encontró el servicio',
        HttpStatus.NOT_FOUND,
      );
    }
    
    return service
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);

    if (!service) {
      throw new HttpException(
        'No se encontró el servicio',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(service, updateServiceDto)
    return this.serviceRepository.save(service);
  }

  async remove(id: number) {
    const service = await this.findOne(id);

    if (!service) {
      throw new HttpException(
        'No se encontró el servicio',
        HttpStatus.NOT_FOUND,
      );
    }

    service.deletedAt = new Date()
    service.serv_status = false

    return this.serviceRepository.save(service);
  }
}
