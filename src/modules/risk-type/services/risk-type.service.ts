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

  async createRiskType(createRiskTypeDto: CreateRiskTypeDto) {
    if (!createRiskTypeDto || !createRiskTypeDto.ris_t_name) {
      throw new HttpException(
        'El nombre del tipo de riesgo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const FindRiskType = await this.riskTypeRepository.findOne({
      where: {
        ris_t_name: createRiskTypeDto.ris_t_name,
        ris_t_status: true,
      },
    });

    if (FindRiskType) {
      throw new HttpException(
        'El tipo de riesgo ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const riskType = this.riskTypeRepository.create(createRiskTypeDto);

    await this.riskTypeRepository.save(riskType);

    return new HttpException(
      `¡El tipo de riesgo ${riskType.ris_t_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllRiskTypes() {
    const riskTypes = await this.riskTypeRepository.find({
      where: {
        ris_t_status: true,
      },
      order: {
        ris_t_name: 'ASC',
      },
    });

    if (riskTypes.length === 0) {
      throw new HttpException(
        'No se encontró la lista de tipos de riesgo.',
        HttpStatus.NOT_FOUND,
      );
    }

    return riskTypes;
  }

  async findOneRiskType(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del tipo de riesgo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const riskType = await this.riskTypeRepository.findOne({
      where: { id, ris_t_status: true },
    });

    if (!riskType) {
      throw new HttpException(
        'No se encontró el tipo de riesgo',
        HttpStatus.NOT_FOUND,
      );
    }

    return riskType;
  }

  async updateRiskType(id: number, updateRiskTypeDto: UpdateRiskTypeDto) {
    if (!updateRiskTypeDto) {
      throw new HttpException(
        'Los datos para actualizar el tipo de riesgo son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const riskType = await this.findOneRiskType(id);
    const result = await this.riskTypeRepository.update(
      riskType.id,
      updateRiskTypeDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tipo de riesgo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
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
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
