import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePositionDto } from '../dto/create-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position as PositionEntity } from '../entities/position.entity';
import { Repository } from 'typeorm';
import { HttpPositionService } from '../http/http-position.service';
import { UpdatePositionDto } from '../dto/update-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private readonly positionRepository: Repository<PositionEntity>,

    private readonly httpPositionService: HttpPositionService,
  ) {}

  async createPosition(
    createPositionDto: CreatePositionDto,
  ): Promise<PositionEntity> {
    const FindPosition = await this.positionRepository.findOne({
      where: {
        pos_name: createPositionDto.pos_name,
        pos_enabled: true,
      },
    });

    if (FindPosition) {
      throw new HttpException(
        'La posicion ya existe.',
        HttpStatus.CONFLICT,
      );
    }
    const position = this.positionRepository.create(createPositionDto);
    return await this.positionRepository.save(position);
  }

  async synchronizePositions() {
    const externalData = await this.httpPositionService.getPositionData();

    if (!Array.isArray(externalData.data.data)) {
      throw new HttpException(
        'La estructura de los datos externos no es la esperada.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (externalData.data.data.length === 0) {
      throw new HttpException(
        'No se encontraron datos de cargos',
        HttpStatus.NO_CONTENT,
      );
    }

    const existsPosition = await this.positionRepository.find();

    const newPositions = externalData.data.data.filter((externalPosition) => {
      return !existsPosition.some(
        (position) => position.pos_code_k === externalPosition.position_code_k,
      );
    });

    const createPosition: CreatePositionDto[] = newPositions.map(
      (position) => ({
        pos_code_k: position.position_code_k,
        pos_name: position.position_description,
        pos_level: position.position_level,
      }),
    );

    for (const pos of createPosition) {
      const newPosition = this.positionRepository.create(pos);
      await this.positionRepository.save(newPosition);
    }

    return createPosition.length;
  }

  async findAllPosition(): Promise<PositionEntity[]> {
    const positions = await this.positionRepository.find({
      where: { pos_enabled: true },
    });

    if (positions.length === 0) {
      throw new HttpException(
        'No se encontró la lista de cargos',
        HttpStatus.NO_CONTENT,
      );
    }

    return positions;
  }

  async findOnePosition(id: number): Promise<PositionEntity> {
    const position = await this.positionRepository.findOne({
      where: { id, pos_enabled: true },
    });

    if (!position) {
      throw new HttpException('No se encontró el cargo', HttpStatus.NO_CONTENT);
    }
    return position;
  }

  async findEmployeeByCode(code: number) {
    const externalData = await this.httpPositionService.getPositionData(code);

    if (!Array.isArray(externalData.data.data)) {
      throw new HttpException(
        'La estructura de los datos externos no es la esperada.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (externalData.data.data.length === 0) {
      throw new HttpException(
        'No se encontraron datos del empleado',
        HttpStatus.NO_CONTENT,
      );
    }

    return externalData.data.data;
  }

  async updateEnabledPosition(
    id: number,
    enabledPosition: UpdatePositionDto,
  ) {
    const position = await this.findOnePosition(id);
    const result = await this.positionRepository.update(
      position.id,
      enabledPosition,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el cargo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deletePosition(id: number) {
    const position = await this.findOnePosition(id);
    const result = await this.positionRepository.softDelete(position.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el cargo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
