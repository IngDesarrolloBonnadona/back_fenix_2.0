import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRiskTypeDto } from './dto/create-risk-type.dto';
import { UpdateRiskTypeDto } from './dto/update-risk-type.dto';
import { Repository } from 'typeorm';
import { RiskType as RiskTypeEntity } from './entities/risk-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RiskTypeService {
  constructor(
    @InjectRepository(RiskTypeEntity)
    private readonly riskTypeRepository: Repository<RiskTypeEntity>,
  ) {}

  async create(createRiskTypeDto: CreateRiskTypeDto) {
    const riskType = this.riskTypeRepository.create(createRiskTypeDto);
    return await this.riskTypeRepository.save(riskType);
  }

  async findAll() {
    const riskTypes = await this.riskTypeRepository.find({
      relations: {
        caseReportOriginal: true,
      }
    });

    if (!riskTypes) {
      throw new HttpException(
        'No se encontró la lista de tipos de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    return riskTypes
  }

  async findOne(id: number) {
    const riskType = await this.riskTypeRepository.findOne({ where: { id } });

    if (!riskType) {
      throw new HttpException(
        'No se encontró el tipo de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    return riskType
  }

  async update(id: number, updateRiskTypeDto: UpdateRiskTypeDto) {
    const riskType = await this.findOne(id);

    if (!riskType) {
      throw new HttpException(
        'No se encontró el tipo de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(riskType, updateRiskTypeDto);

    riskType.tries_fecha_actualizacion = new Date();
    return await this.riskTypeRepository.save(riskType);
  }

  async remove(id: number) {
    const riskType = await this.findOne(id);

    if (!riskType) {
      throw new HttpException(
        'No se encontró el tipo de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    riskType.tries_fecha_eliminacion = new Date()
    riskType.tries_estado = false;

    return await this.riskTypeRepository.save(riskType);
  }
}
