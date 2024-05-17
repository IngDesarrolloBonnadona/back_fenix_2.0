import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit as UnitEntity } from '../entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>
  ){}

  async createUnit(createUnitDto: CreateUnitDto) {
    const unit = this.unitRepository.create(createUnitDto);
    return await this.unitRepository.save(unit);
  }

  async findAllUnits() {
    const units = await this.unitRepository.find({
      relations: {
        service: true,
        caseReportOriginal: true
      }
    });

    if (!units) {
      throw new HttpException(
        'No se encontró la lista de unidades.',
        HttpStatus.NOT_FOUND,
      );
    }

    return units
  }

  async findOneUnit(id: number) {
    const unit = await this.unitRepository.findOne({ where: { id } });

    if (!unit) {
      throw new HttpException(
        'No se encontró la unidad.',
        HttpStatus.NOT_FOUND,
      );
    }

    return unit
  }

  async updateUnit(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOneUnit(id);

    Object.assign(unit, updateUnitDto)

    unit.updateAt = new Date();
    
    return await this.unitRepository.save(unit);
  }

  async deleteUnit(id: number) {
    const unit = await this.findOneUnit(id);
    const result =  await this.unitRepository.softDelete(unit.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la unidad.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
