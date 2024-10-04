import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit as UnitEntity } from '../entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
  ) {}

  async createUnit(createUnitDto: CreateUnitDto) {
    if (!createUnitDto || !createUnitDto.unit_name) {
      return new HttpException(
        'El nombre de la unidad es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const FindUnit = await this.unitRepository.findOne({
      where: {
        unit_name: createUnitDto.unit_name,
        unit_status: true,
      },
    });

    if (FindUnit) {
      return new HttpException(
        'La unidad ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const unit = this.unitRepository.create(createUnitDto);
    await this.unitRepository.save(unit);

    return new HttpException(
      `¡La unidad ${unit.unit_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllUnits() {
    const units = await this.unitRepository.find({
      where: {
        unit_status: true,
      },
      // relations: {
      //   event: true,
      // },
      order: {
        unit_name: 'ASC',
      },
    });

    if (units.length === 0) {
      return new HttpException(
        'No se encontró la lista de unidades.',
        HttpStatus.NOT_FOUND,
      );
    }

    return units;
  }

  async findOneUnit(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador de la unidada es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const unit = await this.unitRepository.findOne({
      where: { id, unit_status: true },
      // relations: {
      //   event: true,
      // },
    });

    if (!unit) {
      return new HttpException(
        'No se encontró la unidad.',
        HttpStatus.NOT_FOUND,
      );
    }

    return unit;
  }

  async updateUnit(id: number, updateUnitDto: UpdateUnitDto) {
    if (!updateUnitDto) {
      return new HttpException(
        'Los datos para actualizar la unidad son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const unit = await this.findOneUnit(id);
    const result = await this.unitRepository.update(id, updateUnitDto);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la unidad`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteUnit(id: number) {
    const unitFound = await this.unitRepository.findOneBy({ id });

    if (!unitFound) {
      return new HttpException(
        `Unidad no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.unitRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la unidad.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
