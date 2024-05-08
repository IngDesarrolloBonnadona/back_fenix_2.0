import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubOriginDto } from './dto/create-sub-origin.dto';
import { UpdateSubOriginDto } from './dto/update-sub-origin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubOrigin as SubOriginEntity } from './entities/sub-origin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubOriginService {
  constructor(
    @InjectRepository(SubOriginEntity)
    private readonly subOriginRepository: Repository<SubOriginEntity>,
  ){}

  async create(createSubOriginDto: CreateSubOriginDto) {
    const subOrigin = this.subOriginRepository.create(createSubOriginDto);
    return await this.subOriginRepository.save(subOrigin);
  }

  async findAll() {
    const subOrigins = await this.subOriginRepository.find({
      relations: {
        origin: true,
        caseReportOriginal: true
      }
    });

    if (!subOrigins) {
      throw new HttpException(
        'No se encontró la lista de subfuentes',
        HttpStatus.NOT_FOUND,
      );
    };

    return subOrigins
  }

  async findOne(id: number) {
    const subOrigin = await this.subOriginRepository.findOne({ where: { id } });

    if (!subOrigin) {
      throw new HttpException(
        'No se encontró el subfuente',
        HttpStatus.NOT_FOUND,
      );
    };

    return subOrigin
  }

  async update(id: number, updateSubOriginDto: UpdateSubOriginDto) {
    const subOrigin = await this.findOne(id);

    if (!subOrigin) {
      throw new HttpException(
        'No se encontró el subfuente',
        HttpStatus.NOT_FOUND,
      );
    };

    Object.assign(subOrigin, updateSubOriginDto)

    subOrigin.sfu_fecha_actualizacion = new Date();
    
    return await this.subOriginRepository.save(subOrigin);
  }

  async remove(id: number) {
    const subOrigin = await this.findOne(id);

    if (!subOrigin) {
      throw new HttpException(
        'No se encontró el subfuente',
        HttpStatus.NOT_FOUND,
      );
    };

    subOrigin.sfu_fecha_eliminacion = new Date();
    subOrigin.sfu_estado = false

    return await this.subOriginRepository.save(subOrigin);
  }
}
