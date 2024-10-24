import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateRiskLevelDto } from '../dto/create-risk-level.dto';
import { UpdateRiskLevelDto } from '../dto/update-risk-level.dto';

import { RiskLevel } from '../entities/risk-level.entity';

@Injectable()
export class RiskLevelService {
  constructor(
    @InjectRepository(RiskLevel)
    private readonly riskLevelRepository: Repository<RiskLevel>,
  ) {}

  async createRiskLevel(createRiskLevelDto: CreateRiskLevelDto) {
    if (!createRiskLevelDto || !createRiskLevelDto.ris_l_name) {
      return new HttpException(
        'El nombre del nivel de riesgo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const FindRiskLevel = await this.riskLevelRepository.findOne({
      where: {
        ris_l_name: createRiskLevelDto.ris_l_name,
        ris_l_status: true,
      },
    });

    if (FindRiskLevel) {
      return new HttpException(
        'El nivel de riesgo ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      order: {
        ris_l_name: 'ASC',
      },
    });

    if (riskLevels.length === 0) {
      return new HttpException(
        'No se encontró la lista de niveles de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    return riskLevels;
  }

  async findOneRiskLevel(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del nivel de riesgo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const riskLevel = await this.riskLevelRepository.findOne({
      where: { id, ris_l_status: true },
    });

    if (!riskLevel) {
      return new HttpException(
        'No se encontró el nivel de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    return riskLevel;
  }

  async updateRiskLevel(id: number, updateRiskLevelDto: UpdateRiskLevelDto) {
    if (!updateRiskLevelDto) {
      return new HttpException(
        'Los datos para actualizar el nivel de riesgo son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneRiskLevel(id);
    const result = await this.riskLevelRepository.update(
      id,
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
      HttpStatus.OK,
    );
  }

  async deleteRiskLevel(id: number) {
    const riskLevelFound = await this.riskLevelRepository.findOneBy({ id });

    if (!riskLevelFound) {
      return new HttpException(
        `Nivel de riesgo no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.riskLevelRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el nivel de riesgo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
