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

  async createPosition(createPositionDto: CreatePositionDto) {
    if (
      !createPositionDto ||
      !createPositionDto.pos_name ||
      !createPositionDto.pos_code_k ||
      !createPositionDto.pos_level
    ) {
      throw new HttpException(
        'Algunos datos del cargo son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const FindPosition = await this.positionRepository.findOne({
      where: {
        pos_name: createPositionDto.pos_name,
        pos_status: true,
      },
    });

    if (FindPosition) {
      throw new HttpException(
        'La posicion ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const position = this.positionRepository.create(createPositionDto);
    await this.positionRepository.save(position);

    return new HttpException(
      `¡La posición ${position.pos_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
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
        HttpStatus.NOT_FOUND,
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

  async findAllPosition() {
    const positions = await this.positionRepository.find({
      where: { pos_status: true },
      order: {
        pos_name: 'ASC',
      },
    });

    if (positions.length === 0) {
      throw new HttpException(
        'No se encontró la lista de cargos',
        HttpStatus.NOT_FOUND,
      );
    }

    return positions;
  }

  async findOnePosition(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del cargo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const position = await this.positionRepository.findOne({
      where: { id, pos_status: true },
    });

    if (!position) {
      throw new HttpException('No se encontró el cargo', HttpStatus.NOT_FOUND);
    }
    return position;
  }

  async findEmployeeByCode(code: number) {
    if (!code) {
      throw new HttpException(
        'El codigo del cargo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

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
        HttpStatus.NOT_FOUND,
      );
    }

    return externalData.data.data;
  }

  async updatePosition(id: number, updatePositionDto: UpdatePositionDto) {
    if (!updatePositionDto) {
      throw new HttpException(
        'Los datos para actualizar el cargo son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const position = await this.findOnePosition(id);
    const result = await this.positionRepository.update(
      position.id,
      updatePositionDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el cargo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deletePosition(id: number) {
    const positionFound = await this.positionRepository.findOneBy({ id });

    if (!positionFound) {
      return new HttpException(
        `Cargo no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.positionRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el cargo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
