import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseReportValidateDto } from './dto/create-case-report-validate.dto';
import { UpdateCaseReportValidateDto } from './dto/update-case-report-validate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseReportValidate as CaseReportValidateEntity } from './entities/case-report-validate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CaseReportValidateService {
  constructor(
    @InjectRepository(CaseReportValidateEntity)
    private readonly caseReportValidateRepository: Repository<CaseReportValidateEntity>
  ){}

  async create(createCaseReportValidateDto: CreateCaseReportValidateDto) {
    const CaseReportValidate = this.caseReportValidateRepository.create(createCaseReportValidateDto);
    return await this.caseReportValidateRepository.save(CaseReportValidate);
  }

  async findAll() {
    return await this.caseReportValidateRepository.find({
      relations:{
        caseReportOriginal: true
      }
    });
  }

  async findOne(id: number) {
    return await this.caseReportValidateRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCaseReportValidateDto: UpdateCaseReportValidateDto) {
    const caseReportValidate = await this.findOne(id);

    // Valida si existe
    if (!caseReportValidate) {
      throw new NotFoundException();
    }

    // Actualiza los campos con los valores proporcionados
    Object.assign(caseReportValidate, updateCaseReportValidateDto)

    // Actualiza la fecha de actualización
    caseReportValidate.rcval_fecha_actualizacion = new Date();
    
    return this.caseReportValidateRepository.save(caseReportValidate);
  }

  async remove(id: number) {
    const caseReportValidate = await this.findOne(id);

    if (!caseReportValidate) {
      throw new NotFoundException();
    }
    return this.caseReportValidateRepository.remove(caseReportValidate)
  }
}
