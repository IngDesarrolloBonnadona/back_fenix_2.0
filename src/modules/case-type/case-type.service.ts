import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseTypeDto } from './dto/create-case-type.dto';
import { UpdateCaseTypeDto } from './dto/update-case-type.dto';
import { Repository } from 'typeorm';
import { CaseType as CaseTypeEntity } from './entities/case-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CaseTypeService {
  constructor(
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository:
    Repository<CaseTypeEntity>){
  }

  async create(createCaseTypeDto: CreateCaseTypeDto) {
    const caseType = this.caseTypeRepository.create(createCaseTypeDto);
    return await this.caseTypeRepository.save(caseType);
  }

  async findAll() {
    return await this.caseTypeRepository.find({
      relations: {
        eventType: true,
        caseReportOriginal: true
      }
    });
  }

  async findOne(id: number) {
    return await this.caseTypeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCaseTypeDto: UpdateCaseTypeDto) {
    const caseType = await this.findOne(id);

    if(!caseType) {
      throw new NotFoundException();
    }

    Object.assign(caseType, updateCaseTypeDto);

    caseType.tcas_fecha_actualizacion = new Date();

    return await this.caseTypeRepository.save(caseType);
  }

  async remove(id: number) {
    const caseType = await this.findOne(id);

    if(!caseType) {
      throw new NotFoundException();
    }

    return await this.caseTypeRepository.remove(caseType);
  }
}
