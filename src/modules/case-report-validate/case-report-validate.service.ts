import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const caseReportValidates = await this.caseReportValidateRepository.find({
      relations:{
        caseReportOriginal: true
      }
    });

    if (!caseReportValidates) {
      throw new HttpException(
        'No se encontró la lista de reportes validado',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportValidates
  }

  async findOne(id: number) {
const caseReportValidate = await this.caseReportValidateRepository.findOne({ where: { id } });

    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte validado',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportValidate
  }

  async update(id: number, updateCaseReportValidateDto: UpdateCaseReportValidateDto) {
    const caseReportValidate = await this.findOne(id);

    // Valida si existe
    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte validado',
        HttpStatus.NOT_FOUND,
      );
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
      throw new HttpException(
        'No se encontró el reporte validado',
        HttpStatus.NOT_FOUND,
      );
    }

    caseReportValidate.rcval_fecha_eliminacion = new Date();
    caseReportValidate.rcval_estado = false;

    return this.caseReportValidateRepository.save(caseReportValidate)
  }
}
