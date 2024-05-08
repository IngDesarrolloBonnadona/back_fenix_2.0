import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const riskLevels = await this.riskLevelRepository.find({
      relations: {
        caseReportOriginal: true
      }
    });

    if (!riskLevels) {
      throw new HttpException(
        'No se encontró la lista de niveles de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    return riskLevels
  }

  async findOne(id: number) {
    const riskLevel = await this.riskLevelRepository.findOne({ where: { id } });

    if (!riskLevel) {
      throw new HttpException(
        'No se encontró el nivel de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    return riskLevel
  }

  async update(id: number, updateRiskLevelDto: UpdateRiskLevelDto) {
    const riskLevel = await this.findOne(id);

    if (!riskLevel) {
      throw new HttpException(
        'No se encontró el nivel de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(riskLevel, updateRiskLevelDto)

    riskLevel.nries_fecha_actualizacion = new Date();
    
    return await this.riskLevelRepository.save(riskLevel);
  }

  async remove(id: number) {
    const riskLevel = await this.findOne(id);

    if (!riskLevel) {
      throw new HttpException(
        'No se encontró el nivel de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    riskLevel.nries_fecha_eliminacion = new Date();
    riskLevel.nries_estado = false;

    return await this.riskLevelRepository.save(riskLevel);
  }
}
