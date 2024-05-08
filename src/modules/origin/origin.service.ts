import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const origins = await this.originRepository.find({
      relations: {
        subOrigins: true,
        caseReportOriginal: true
      }
    });

    if (!origins) {
      throw new HttpException(
        'No se encontró la lista de fuentes',
        HttpStatus.NOT_FOUND,
      );
    }

    return origins
  }

  async findOne(id: number) {
    const origin = await this.originRepository.findOne({ where: { id } });

    if (!origin) {
      throw new HttpException(
        'No se encontró la fuente',
        HttpStatus.NOT_FOUND,
      );
    }

    return origin;
  }

  async update(id: number, updateOriginDto: UpdateOriginDto) {
    const origin = await this.findOne(id);

    if (!origin) {
      throw new HttpException(
        'No se encontró la fuente',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(origin, updateOriginDto)

    origin.fu_fecha_actualizacion = new Date();

    return await this.originRepository.save(origin);
  }

  async remove(id: number) {
    const origin = await this.findOne(id);

    if (!origin) {
      throw new HttpException(
        'No se encontró la fuente',
        HttpStatus.NOT_FOUND,
      );
    }

    origin.fu_fecha_eliminacion = new Date(),
    origin.fu_estado = false;

    return await this.originRepository.save(origin);
  }
}
