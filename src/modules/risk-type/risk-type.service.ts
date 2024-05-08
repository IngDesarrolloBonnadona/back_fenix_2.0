import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.riskTypeRepository.find({
      relations: {
        caseReportOriginal: true,
      }
    });
  }

  async findOne(id: number) {
    return await this.riskTypeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRiskTypeDto: UpdateRiskTypeDto) {
    const riskType = await this.findOne(id);

    if (!riskType) {
      throw new NotFoundException();
    }

    Object.assign(riskType, updateRiskTypeDto);

    riskType.tries_fecha_actualizacion = new Date();
    return await this.riskTypeRepository.save(riskType);
  }

  async remove(id: number) {
    const riskType = await this.findOne(id);

    if (!riskType) {
      throw new NotFoundException();
    }
    return await this.riskTypeRepository.remove(riskType);
  }
}
