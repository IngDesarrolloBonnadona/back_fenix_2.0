import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubOriginDto } from '../dto/create-sub-origin.dto';
import { UpdateSubOriginDto } from '../dto/update-sub-origin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubOrigin as SubOriginEntity } from '../entities/sub-origin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubOriginService {
  constructor(
    @InjectRepository(SubOriginEntity)
    private readonly subOriginRepository: Repository<SubOriginEntity>,
  ){}

  async createSubOrigin(createSubOriginDto: CreateSubOriginDto) {
    const subOrigin = this.subOriginRepository.create(createSubOriginDto);
    return await this.subOriginRepository.save(subOrigin);
  }

  async findAllSubOrigins() {
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

  async findOneSubOrigin(id: number) {
    const subOrigin = await this.subOriginRepository.findOne({ where: { id } });

    if (!subOrigin) {
      throw new HttpException(
        'No se encontró el subfuente',
        HttpStatus.NOT_FOUND,
      );
    };

    return subOrigin
  }

  async updateSubOrigin(id: number, updateSubOriginDto: UpdateSubOriginDto) {
    const subOrigin = await this.findOneSubOrigin(id);

    Object.assign(subOrigin, updateSubOriginDto)

    subOrigin.updateAt = new Date();
    
    return await this.subOriginRepository.save(subOrigin);
  }

  async deleteSubOrigin(id: number) {
    const subOrigin = await this.findOneSubOrigin(id);
    const result = await this.subOriginRepository.softDelete(subOrigin.id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el suborigen.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }  
    return {message: `El suborigen se eliminó correctamente`}
  }
}
