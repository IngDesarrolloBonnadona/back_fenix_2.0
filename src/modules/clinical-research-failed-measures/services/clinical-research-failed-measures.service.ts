import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClinicalResearchFailedMeasureDto } from '../dto/create-clinical-research-failed-measure.dto';
import { UpdateClinicalResearchFailedMeasureDto } from '../dto/update-clinical-research-failed-measure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalResearchFailedMeasure as ClinicalResearchFailedMeasureEntity } from '../entities/clinical-research-failed-measure.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class ClinicalResearchFailedMeasuresService {
  constructor(
    @InjectRepository(ClinicalResearchFailedMeasureEntity)
    private readonly clinicalResearchFailedMeasureRepository: Repository<ClinicalResearchFailedMeasureEntity>,
  ) {}
  async createClinicalResearchFailedMeasureTransaction(
    clinicalResearchFailedMeasure: CreateClinicalResearchFailedMeasureDto[],
    clinicalResearchId: string,
    queryRunner: QueryRunner,
  ) {
    const existingClinicalResearchFailedMeasure =
      await this.clinicalResearchFailedMeasureRepository.find({
        where: { meas_fcr_clinicalresearch_id_fk: clinicalResearchId },
      });

    if (existingClinicalResearchFailedMeasure.length > 0) {
      await queryRunner.manager.remove(existingClinicalResearchFailedMeasure);
    }

    for (const clinicalResearchFM of clinicalResearchFailedMeasure) {
      const data = this.clinicalResearchFailedMeasureRepository.create({
        ...clinicalResearchFM,
        meas_fcr_clinicalresearch_id_fk: clinicalResearchId,
      });

      await queryRunner.manager.save(data);
    }
  }
}
