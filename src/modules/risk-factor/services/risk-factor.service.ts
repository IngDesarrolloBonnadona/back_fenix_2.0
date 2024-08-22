import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRiskFactorDto } from '../dto/create-risk-factor.dto';
import { UpdateRiskFactorDto } from '../dto/update-risk-factor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RiskFactor as RiskFactorEntity } from '../entities/risk-factor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RiskFactorService {
  constructor(
    @InjectRepository(RiskFactorEntity)
    private readonly riskFactorRepository: Repository<RiskFactorEntity>,
  ) {}

  async createRiskFactor(createRiskFactorDto: CreateRiskFactorDto) {
    if (!createRiskFactorDto || !createRiskFactorDto.ris_f_name) {
      return new HttpException(
        'El nombre del factor de riesgp es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findRiskFactor = await this.riskFactorRepository.findOne({
      where: {
        ris_f_name: createRiskFactorDto.ris_f_name,
        ris_f_status: true,
      },
    });

    if (findRiskFactor) {
      return new HttpException(
        'El factor de riesgo ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const riskFactor = this.riskFactorRepository.create(createRiskFactorDto);
    await this.riskFactorRepository.save(riskFactor);

    return new HttpException(
      `¡El factor de riesgo ${riskFactor.ris_f_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllRiskFactors() {
    const riskFactors = await this.riskFactorRepository.find({
      where: { ris_f_status: true },
      order: { ris_f_name: 'ASC' },
    });

    if (riskFactors.length === 0) {
      return new HttpException(
        'No se encontró la lista de factores de riesgo.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskFactors;
  }

  async findOneRiskFactor(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del factor de riesgo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const riskFactor = await this.riskFactorRepository.findOne({
      where: { id, ris_f_status: true },
    });

    if (!riskFactor) {
      return new HttpException(
        'No se encontró el factor de riesgo.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskFactor;
  }

  async updateRiskFactor(id: number, updateRiskFactorDto: UpdateRiskFactorDto) {
    if (!updateRiskFactorDto) {
      return new HttpException(
        'Los datos para actualizar el factor de riesgo son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.findOneRiskFactor(id);
    const result = await this.riskFactorRepository.update(
      id,
      updateRiskFactorDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el factor de riesgo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteRiskFactor(id: number) {
    const riskFactorFound = await this.riskFactorRepository.findOneBy({ id });

    if (!riskFactorFound) {
      return new HttpException(
        `Factor de riesgo no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.riskFactorRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar elfactor de riesgo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
