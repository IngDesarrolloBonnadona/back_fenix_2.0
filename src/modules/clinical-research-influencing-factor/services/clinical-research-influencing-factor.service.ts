import { Injectable } from '@nestjs/common';
import { CreateClinicalResearchInfluencingFactorDto } from '../dto/create-clinical-research-influencing-factor.dto';
import { UpdateClinicalResearchInfluencingFactorDto } from '../dto/update-clinical-research-influencing-factor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalResearchInfluencingFactor as ClinicalResearchInfluencingFactorEntity } from '../entities/clinical-research-influencing-factor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClinicalResearchInfluencingFactorService {
  constructor(
    @InjectRepository(ClinicalResearchInfluencingFactorEntity)
    private readonly clinicalResearchInfluencingFactorRepository: Repository<ClinicalResearchInfluencingFactorEntity>,
  ) {}
  
  create(
    createClinicalResearchInfluencingFactorDto: CreateClinicalResearchInfluencingFactorDto,
  ) {
    return 'This action adds a new clinicalResearchInfluencingFactor';
  }

  findAll() {
    return `This action returns all clinicalResearchInfluencingFactor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalResearchInfluencingFactor`;
  }

  update(
    id: number,
    updateClinicalResearchInfluencingFactorDto: UpdateClinicalResearchInfluencingFactorDto,
  ) {
    return `This action updates a #${id} clinicalResearchInfluencingFactor`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalResearchInfluencingFactor`;
  }
}
