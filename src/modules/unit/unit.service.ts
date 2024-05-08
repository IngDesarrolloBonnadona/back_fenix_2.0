import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit as UnitEntity } from './entities/unit.entity';
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
    return await this.unitRepository.find({
      relations: {
        service: true,
        caseReportOriginal: true
      }
    });
  }

  async findOne(id: number) {
    return await this.unitRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOne(id);

    if (!unit) {
      throw new NotFoundException();
    }

    Object.assign(unit, updateUnitDto)

    unit.unid_fecha_actualizacion = new Date();
    
    return await this.unitRepository.save(unit);
  }

  async remove(id: number) {
    const unit = await this.findOne(id);

    if (!unit) {
      throw new NotFoundException();
    }
    return await this.unitRepository.remove(unit);
  }
}
