import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseTypeDto } from '../dto/create-case-type.dto';
import { UpdateCaseTypeDto } from '../dto/update-case-type.dto';
import { Repository } from 'typeorm';
import { CaseType as CaseTypeEntity } from './case-type.entity';
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
    const caseTypes = await this.caseTypeRepository.find({
      relations: {
        eventType: true,
        caseReportOriginal: true
      }
    });

    if (!caseTypes) {
      throw new HttpException(
        'No se encontró la lista de tipos de caso',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseTypes
  }

  async findOne(id: number) {
    const caseType = await this.caseTypeRepository.findOne({ where: { id } });

    if (!caseType) {
      throw new HttpException(
        'No se encontró el tipo de caso',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseType
  }

  async update(id: number, updateCaseTypeDto: UpdateCaseTypeDto) {
    const caseType = await this.findOne(id);

    if (!caseType) {
      throw new HttpException(
        'No se encontró el tipo de caso',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(caseType, updateCaseTypeDto);

    caseType.updateAt = new Date();

    return await this.caseTypeRepository.save(caseType);
  }

  async remove(id: number) {
    const caseType = await this.findOne(id);

    if (!caseType) {
      throw new HttpException(
        'No se encontró el tipo de caso',
        HttpStatus.NOT_FOUND,
      );
    }

    caseType.deletedAt = new Date();
    caseType.cas_t_status = false;

    return await this.caseTypeRepository.save(caseType);
  }
}
