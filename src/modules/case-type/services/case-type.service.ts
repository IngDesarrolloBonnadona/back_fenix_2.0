import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseTypeDto } from '../dto/create-case-type.dto';
import { UpdateCaseTypeDto } from '../dto/update-case-type.dto';
import { Repository } from 'typeorm';
import { CaseType as CaseTypeEntity } from '../entities/case-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CaseTypeService {
  constructor(
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository:
    Repository<CaseTypeEntity>){
  }

  async createCaseType(createCaseTypeDto: CreateCaseTypeDto) {
    const caseType = this.caseTypeRepository.create(createCaseTypeDto);
    return await this.caseTypeRepository.save(caseType);
  }

  async findAllCaseTypes() {
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

  async findOneCaseType(id: number) {
    const caseType = await this.caseTypeRepository.findOne({ where: { id } });

    if (!caseType) {
      throw new HttpException(
        'No se encontró el tipo de caso',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseType
  }

  // async updateCaseType(id: number, updateCaseTypeDto: UpdateCaseTypeDto) {
  //   const caseType = await this.findOneCaseType(id);

  //   Object.assign(caseType, updateCaseTypeDto);

  //   caseType.updateAt = new Date();

  //   return await this.caseTypeRepository.save(caseType);
  // }

  async updateCaseType(id: number, updateCaseTypeDto: UpdateCaseTypeDto) {
    const caseType = await this.findOneCaseType(id);
    const result = await this.caseTypeRepository.update(caseType.id, updateCaseTypeDto);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tipo de caso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteCaseType(id: number) {
    const caseType = await this.findOneCaseType(id);
    const result = await this.caseTypeRepository.softDelete(caseType.id);
    
    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de caso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
