import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service as ServiceEntity } from './entities/service.entity';
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
    return await this.serviceRepository.find({
      relations: {
        unit: true,
        caseReportOriginal: true
      }
    });
  }

  async findOne(id: number) {
    return await this.serviceRepository.findOne({ where: { id } });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);

    if (!service) {
      throw new NotFoundException();
    }

    Object.assign(service, updateServiceDto)
    return this.serviceRepository.save(service);
  }

  async remove(id: number) {
    const service = await this.findOne(id);

    if (!service) {
      throw new NotFoundException();
    }
    return this.serviceRepository.remove(service);
  }
}
