import { Module } from '@nestjs/common';
import { ClinicalResearchService } from './services/clinical-research.service';
import { ClinicalResearchController } from './controllers/clinical-research.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalResearch } from './entities/clinical-research.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';
import { ResearchInstrumentModule } from '../research-instrument/research-instrument.module';
import { DeviceTypeModule } from '../device-type/device-type.module';
import { DamageTypeModule } from '../damage-type/damage-type.module';
import { FluidTypeModule } from '../fluid-type/fluid-type.module';
import { RiskFactorModule } from '../risk-factor/risk-factor.module';
import { SafetyBarriersModule } from '../safety-barriers/safety-barriers.module';
import { ClinicalResearchInfluencingFactorModule } from '../clinical-research-influencing-factor/clinical-research-influencing-factor.module';
import { InfluencingFactorModule } from '../influencing-factor/influencing-factor.module';
import { FailedMeasuresModule } from '../failed-measures/failed-measures.module';
import { ClinicalResearchFailedMeasuresModule } from '../clinical-research-failed-measures/clinical-research-failed-measures.module';
import { ClinicalResearchCaseReportValidateModule } from '../clinical-research-case-report-validate/clinical-research-case-report-validate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicalResearch]),
    UserModule,
    ResearchInstrumentModule,
    DeviceTypeModule,
    DamageTypeModule,
    FluidTypeModule,
    RiskFactorModule,
    SafetyBarriersModule,
    ClinicalResearchInfluencingFactorModule,
    ClinicalResearchFailedMeasuresModule,
    ClinicalResearchCaseReportValidateModule,
    InfluencingFactorModule,
    FailedMeasuresModule,
  ],
  controllers: [ClinicalResearchController],
  providers: [ClinicalResearchService],
})
export class ClinicalResearchModule {}
