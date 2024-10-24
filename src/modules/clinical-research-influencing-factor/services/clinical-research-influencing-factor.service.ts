import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QueryRunner, Repository } from 'typeorm';

import { CreateClinicalResearchInfluencingFactorDto } from '../dto/create-clinical-research-influencing-factor.dto';

import { ClinicalResearchInfluencingFactor } from '../entities/clinical-research-influencing-factor.entity';

@Injectable()
export class ClinicalResearchInfluencingFactorService {
  constructor(
    @InjectRepository(ClinicalResearchInfluencingFactor)
    private readonly clinicalResearchInfluencingFactorRepository: Repository<ClinicalResearchInfluencingFactor>,
  ) {}

  async createClinicalResearchInfluencingFactorTransaction(
    clinicalResearchInfluencingFactor: CreateClinicalResearchInfluencingFactorDto[],
    clinicalResearchId: string,
    queryRunner: QueryRunner,
  ) {
    const existingClinicalResearchInfluencingFactor =
      await queryRunner.manager.find(ClinicalResearchInfluencingFactor, {
        where: { inf_fcr_clinicalresearch_id_fk: clinicalResearchId },
      });

    if (existingClinicalResearchInfluencingFactor.length > 0) {
      await queryRunner.manager.remove(
        existingClinicalResearchInfluencingFactor,
      );
    }

    for (const clinicalResearchIF of clinicalResearchInfluencingFactor) {
      const data = queryRunner.manager.create(
        ClinicalResearchInfluencingFactor,
        {
          ...clinicalResearchIF,
          inf_fcr_clinicalresearch_id_fk: clinicalResearchId,
        },
      );

      await queryRunner.manager.save(data);
    }
  }
}
