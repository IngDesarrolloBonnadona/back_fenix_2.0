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
  ],
  controllers: [ClinicalResearchController],
  providers: [ClinicalResearchService],
})
export class ClinicalResearchModule {}
