import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRiskLevelDto } from '../dto/create-risk-level.dto';
import { UpdateRiskLevelDto } from '../dto/update-risk-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RiskLevel as RiskLevelEntity } from '../entities/risk-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RiskLevelService {
  constructor(
    @InjectRepository(RiskLevelEntity)
    private readonly riskLevelRepository: Repository<RiskLevelEntity>,
  ) {}

  async createRiskLevel(
    createRiskLevelDto: CreateRiskLevelDto,
  ) {
    const FindRiskLevel = await this.riskLevelRepository.findOne({
      where: {
        ris_l_name: createRiskLevelDto.ris_l_name,
        ris_l_status: true,
      },
    });

    if (FindRiskLevel) {
      throw new HttpException(
        'El nivel de riesgo ya existe.',
        HttpStatus.CONFLICT,
      );
    }
    const riskLevel = this.riskLevelRepository.create(createRiskLevelDto);
    await this.riskLevelRepository.save(riskLevel);
    
    return new HttpException(
      `¡El nivel de riesgo ${riskLevel.ris_l_name} se creó correctamente!`,
      HttpStatus.CREATED,
    ); 
  }

  async findAllRiskLevel() {
    const riskLevels = await this.riskLevelRepository.find({
      where: {
        ris_l_status: true,
      },
      // relations: {
      //   caseReportValidate: true,
      // },
    });

    if (riskLevels.length === 0) {
      throw new HttpException(
        'No se encontró la lista de niveles de riesgo',
        HttpStatus.NO_CONTENT,
      );
    }

    return riskLevels;
  }

  async findOneRiskLevel(id: number) {
    const riskLevel = await this.riskLevelRepository.findOne({
      where: { id, ris_l_status: true },
      // relations: {
      //   caseReportValidate: true,
      // },
    });

    if (!riskLevel) {
      throw new HttpException(
        'No se encontró el nivel de riesgo',
        HttpStatus.NO_CONTENT,
      );
    }

    return riskLevel;
  }

  async updateRiskLevel(id: number, updateRiskLevelDto: UpdateRiskLevelDto) {
    const riskLevel = await this.findOneRiskLevel(id);
    const result = await this.riskLevelRepository.update(
      riskLevel.id,
      updateRiskLevelDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el nivel de riesgo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteRiskLevel(id: number) {
    const riskLevel = await this.findOneRiskLevel(id);
    const result = await this.riskLevelRepository.softDelete(riskLevel.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el nivel de riesgo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
