import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClinicalResearchDto } from '../dto/create-clinical-research.dto';
import { UpdateClinicalResearchDto } from '../dto/update-clinical-research.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalResearch as ClinicalResearchEntity } from '../entities/clinical-research.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClinicalResearchService {
  constructor(
    @InjectRepository(ClinicalResearchEntity)
    private readonly clinicalResearchRepository: Repository<ClinicalResearchEntity>,

    private dataSource: DataSource,
  ) {}
  async saveProgressClinicalResearch(
    createClinicalResearchDto: CreateClinicalResearchDto,
    id: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let progress: ClinicalResearchEntity;
      if (id) {
        progress = await this.clinicalResearchRepository.findOne({
          where: { id },
        });

        if (!progress) {
          throw new HttpException(
            `No se encontró el progreso guardado.`,
            HttpStatus.NO_CONTENT,
          );
        }
        this.clinicalResearchRepository.merge(
          progress,
          createClinicalResearchDto,
        );
      } else {
        progress = this.clinicalResearchRepository.create(
          createClinicalResearchDto,
        );
      }
      //progress.lastSaved = new Date();

      await queryRunner.manager.save(progress);
      
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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
