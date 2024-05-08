import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRiskLevelDto } from './dto/create-risk-level.dto';
import { UpdateRiskLevelDto } from './dto/update-risk-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RiskLevel as RiskLevelEntity } from './entities/risk-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RiskLevelService {
  constructor(
    @InjectRepository(RiskLevelEntity)
    private readonly riskLevelRepository: Repository<RiskLevelEntity>
  ){}

  async create(createRiskLevelDto: CreateRiskLevelDto) {
    const riskLevel = this.riskLevelRepository.create(createRiskLevelDto);
    return await this.riskLevelRepository.save(riskLevel);
  }

  async findAll() {
    return await this.riskLevelRepository.find({
      relations: {
        caseReportOriginal: true
      }
    });
  }

  async findOne(id: number) {
    return await this.riskLevelRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRiskLevelDto: UpdateRiskLevelDto) {
    const riskLevel = await this.findOne(id);

    if (!riskLevel) {
      throw new NotFoundException();
    }

    Object.assign(riskLevel, updateRiskLevelDto)

    riskLevel.nries_fecha_actualizacion = new Date();
    
    return await this.riskLevelRepository.save(riskLevel);
  }

  async remove(id: number) {
    const riskLevel = await this.findOne(id);

    if (!riskLevel) {
      throw new NotFoundException();
    }
    return await this.riskLevelRepository.remove(riskLevel);
  }
}
