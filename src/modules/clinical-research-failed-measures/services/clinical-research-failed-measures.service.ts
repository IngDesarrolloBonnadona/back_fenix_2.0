import { Injectable } from '@nestjs/common';
import { CreateClinicalResearchFailedMeasureDto } from '../dto/create-clinical-research-failed-measure.dto';
import { UpdateClinicalResearchFailedMeasureDto } from '../dto/update-clinical-research-failed-measure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalResearchFailedMeasure as ClinicalResearchFailedMeasureEntity } from '../entities/clinical-research-failed-measure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClinicalResearchFailedMeasuresService {
  constructor(
    @InjectRepository(ClinicalResearchFailedMeasureEntity)
    private readonly clinicalResearchFailedMeasureRepository: Repository<ClinicalResearchFailedMeasureEntity>,
  ) {}
  create(
    createClinicalResearchFailedMeasureDto: CreateClinicalResearchFailedMeasureDto,
  ) {
    return 'This action adds a new clinicalResearchFailedMeasure';
  }

  findAll() {
    return `This action returns all clinicalResearchFailedMeasures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalResearchFailedMeasure`;
  }

  update(
    id: number,
    updateClinicalResearchFailedMeasureDto: UpdateClinicalResearchFailedMeasureDto,
  ) {
    return `This action updates a #${id} clinicalResearchFailedMeasure`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalResearchFailedMeasure`;
  }
}
