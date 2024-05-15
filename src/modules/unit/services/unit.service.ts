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

  async create(createUnitDto: CreateUnitDto) {
    const unit = this.unitRepository.create(createUnitDto);
    return await this.unitRepository.save(unit);
  }

  async findAll() {
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

  async findOne(id: number) {
    const unit = await this.unitRepository.findOne({ where: { id } });

    if (!unit) {
      throw new HttpException(
        'No se encontró la unidad.',
        HttpStatus.NOT_FOUND,
      );
    }

    return unit
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOne(id);

    if (!unit) {
      throw new HttpException(
        'No se encontró la unidad.',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(unit, updateUnitDto)

    unit.updateAt = new Date();
    
    return await this.unitRepository.save(unit);
  }

  async remove(id: number) {
    const unit = await this.findOne(id);
    
    const isEliminated =  await this.unitRepository.softDelete(unit.id);

    if (isEliminated) {
      throw new HttpException(
        `La unidad se eliminó correctamente`,
        HttpStatus.OK,
      );
    } 
  }
}
