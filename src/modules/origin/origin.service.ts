import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Origin as OriginEntity} from './entities/origin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OriginService {
  constructor(
    @InjectRepository(OriginEntity)
    private readonly originRepository: Repository<OriginEntity>,
  ){}

  async create(createOriginDto: CreateOriginDto) {
    const origin = this.originRepository.create(createOriginDto);
    return await this.originRepository.save(origin);
  }

  async findAll() {
    return await this.originRepository.find({
      relations: {
        subOrigins: true,
        caseReportOriginal: true
      }
    });
  }

  async findOne(id: number) {
    return await this.originRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOriginDto: UpdateOriginDto) {
    const origin = await this.findOne(id);

    if (!origin) {
      throw new NotFoundException();
    }

    Object.assign(origin, updateOriginDto)

    origin.fu_fecha_actualizacion = new Date();

    return await this.originRepository.save(origin);
  }

  async remove(id: number) {
    const origin = await this.findOne(id);

    if (!origin) {
      throw new NotFoundException();
    }
    return await this.originRepository.remove(origin);
  }
}
