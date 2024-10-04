import { Module } from '@nestjs/common';
import { ClinicalResearchInfluencingFactorService } from './services/clinical-research-influencing-factor.service';
import { ClinicalResearchInfluencingFactorController } from './controllers/clinical-research-influencing-factor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalResearchInfluencingFactor } from './entities/clinical-research-influencing-factor.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicalResearchInfluencingFactor]),
    UserModule,
  ],
  controllers: [ClinicalResearchInfluencingFactorController],
  providers: [ClinicalResearchInfluencingFactorService],
  exports: [ClinicalResearchInfluencingFactorService],
})
export class ClinicalResearchInfluencingFactorModule {}
