import { Injectable } from '@nestjs/common';
import { CreateClinicalResearchDto } from '../dto/create-clinical-research.dto';
import { UpdateClinicalResearchDto } from '../dto/update-clinical-research.dto';

@Injectable()
export class ClinicalResearchService {
  create(createClinicalResearchDto: CreateClinicalResearchDto) {
    return 'This action adds a new clinicalResearch';
  }

  findAll() {
    return `This action returns all clinicalResearch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalResearch`;
  }

  update(id: number, updateClinicalResearchDto: UpdateClinicalResearchDto) {
    return `This action updates a #${id} clinicalResearch`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalResearch`;
  }
}
