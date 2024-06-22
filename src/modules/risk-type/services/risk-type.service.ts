import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async createRiskType(createRiskTypeDto: CreateRiskTypeDto): Promise<RiskTypeEntity> {
    const riskType = this.riskTypeRepository.create(createRiskTypeDto);
    return await this.riskTypeRepository.save(riskType);
  }

  async findAllRiskTypes(): Promise<RiskTypeEntity[]> {
    const riskTypes = await this.riskTypeRepository.find({
      // relations: {
      //   caseReportValidate: true,
      // },
    });

    if (riskTypes.length === 0) {
      throw new HttpException(
        'No se encontró la lista de tipos de riesgo',
        HttpStatus.NO_CONTENT,
      );
    }

    return riskTypes;
  }

  async findOneRiskType(id: number): Promise<RiskTypeEntity> {
    const riskType = await this.riskTypeRepository.findOne({
      where: { id },
      // relations: {
      //   caseReportValidate: true,
      // },
    });

    if (!riskType) {
      throw new HttpException(
        'No se encontró el tipo de riesgo',
        HttpStatus.NO_CONTENT,
      );
    }

    return riskType;
  }

  async updateRiskType(id: number, updateRiskTypeDto: UpdateRiskTypeDto) {
    const riskType = await this.findOneRiskType(id);
    const result = await this.riskTypeRepository.update(
      riskType.id,
      updateRiskTypeDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tipo de riesgo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteRiskType(id: number) {
    const riskType = await this.findOneRiskType(id);
    const result = await this.riskTypeRepository.softDelete(riskType.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de riesgo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
