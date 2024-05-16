import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRiskTypeDto } from '../dto/create-risk-type.dto';
import { UpdateRiskTypeDto } from '../dto/update-risk-type.dto';
import { Repository } from 'typeorm';
import { RiskType as RiskTypeEntity } from '../entities/risk-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RiskTypeService {
  constructor(
    @InjectRepository(RiskTypeEntity)
    private readonly riskTypeRepository: Repository<RiskTypeEntity>,
  ) {}

  async createRiskType(createRiskTypeDto: CreateRiskTypeDto) {
    const riskType = this.riskTypeRepository.create(createRiskTypeDto);
    return await this.riskTypeRepository.save(riskType);
  }

  async findAllRiskTypes() {
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

  async findOneRiskType(id: number) {
    const riskType = await this.riskTypeRepository.findOne({ where: { id } });

    if (!riskType) {
      throw new HttpException(
        'No se encontró el tipo de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    return riskType
  }

  async updateRiskType(id: number, updateRiskTypeDto: UpdateRiskTypeDto) {
    const riskType = await this.findOneRiskType(id);

    Object.assign(riskType, updateRiskTypeDto);

    riskType.updateAt = new Date();
    return await this.riskTypeRepository.save(riskType);
  }

  async deleteRiskType(id: number) {
    const riskType = await this.findOneRiskType(id);
    const result = await this.riskTypeRepository.softDelete(riskType.id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el tipo de riesgo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }  
    return { message: `¡Datos eliminados correctamente!` };
  }
}
