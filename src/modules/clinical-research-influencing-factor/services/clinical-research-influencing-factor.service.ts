import { Injectable } from '@nestjs/common';
import { CreateClinicalResearchInfluencingFactorDto } from '../dto/create-clinical-research-influencing-factor.dto';
import { UpdateClinicalResearchInfluencingFactorDto } from '../dto/update-clinical-research-influencing-factor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalResearchInfluencingFactor as ClinicalResearchInfluencingFactorEntity } from '../entities/clinical-research-influencing-factor.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class ClinicalResearchInfluencingFactorService {
  constructor(
    @InjectRepository(ClinicalResearchInfluencingFactorEntity)
    private readonly clinicalResearchInfluencingFactorRepository: Repository<ClinicalResearchInfluencingFactorEntity>,
  ) {}

  async createClinicalResearchInfluencingFactorTransaction(
    clinicalResearchInfluencingFactor: CreateClinicalResearchInfluencingFactorDto[],
    clinicalResearchId: string,
    queryRunner: QueryRunner,
  ) {
    const existingClinicalResearchInfluencingFactor =
      await queryRunner.manager.find(ClinicalResearchInfluencingFactorEntity, {
        where: { inf_fcr_clinicalresearch_id_fk: clinicalResearchId },
      });

    if (existingClinicalResearchInfluencingFactor.length > 0) {
      await queryRunner.manager.remove(
        existingClinicalResearchInfluencingFactor,
      );
    }

    for (const clinicalResearchIF of clinicalResearchInfluencingFactor) {
      const data = queryRunner.manager.create(
        ClinicalResearchInfluencingFactorEntity,
        {
          ...clinicalResearchIF,
          inf_fcr_clinicalresearch_id_fk: clinicalResearchId,
        },
      );

      await queryRunner.manager.save(data);
    }
  }
}
