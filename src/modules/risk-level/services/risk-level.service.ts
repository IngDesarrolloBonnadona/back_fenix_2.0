import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRiskLevelDto } from '../dto/create-risk-level.dto';
import { UpdateRiskLevelDto } from '../dto/update-risk-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RiskLevel as RiskLevelEntity } from '../entities/risk-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RiskLevelService {
  constructor(
    @InjectRepository(RiskLevelEntity)
    private readonly riskLevelRepository: Repository<RiskLevelEntity>
  ){}

  async createRiskLevel(createRiskLevelDto: CreateRiskLevelDto) {
    const riskLevel = this.riskLevelRepository.create(createRiskLevelDto);
    return await this.riskLevelRepository.save(riskLevel);
  }

  async findAllRiskLevel() {
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

  async findOneRiskLevel(id: number) {
    const riskLevel = await this.riskLevelRepository.findOne({ where: { id } });

    if (!riskLevel) {
      throw new HttpException(
        'No se encontró el nivel de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    return riskLevel
  }

  async updateRiskLevel(id: number, updateRiskLevelDto: UpdateRiskLevelDto) {
    const riskLevel = await this.findOneRiskLevel(id);

    Object.assign(riskLevel, updateRiskLevelDto)

    riskLevel.updateAt = new Date();
    
    return await this.riskLevelRepository.save(riskLevel);
  }

  async deleteRiskLevel(id: number) {
    const riskLevel = await this.findOneRiskLevel(id);
    const result = await this.riskLevelRepository.softDelete(riskLevel.id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el nivel de riesgo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
    return { message: `El nivel de riesgo se eliminó correctamente`};
  }
}
