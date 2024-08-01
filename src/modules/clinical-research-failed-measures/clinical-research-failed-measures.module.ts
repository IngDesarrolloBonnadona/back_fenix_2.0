import { Module } from '@nestjs/common';
import { ClinicalResearchFailedMeasuresService } from './services/clinical-research-failed-measures.service';
import { ClinicalResearchFailedMeasuresController } from './controllers/clinical-research-failed-measures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalResearchFailedMeasure } from './entities/clinical-research-failed-measure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalResearchFailedMeasure])],
  controllers: [ClinicalResearchFailedMeasuresController],
  providers: [ClinicalResearchFailedMeasuresService],
  exports: [ClinicalResearchFailedMeasuresService],
})
export class ClinicalResearchFailedMeasuresModule {}
