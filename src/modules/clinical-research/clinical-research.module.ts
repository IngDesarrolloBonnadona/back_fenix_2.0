import { Module } from '@nestjs/common';
import { ClinicalResearchService } from './services/clinical-research.service';
import { ClinicalResearchController } from './controllers/clinical-research.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalResearch } from './entities/clinical-research.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalResearch]), UserModule],
  controllers: [ClinicalResearchController],
  providers: [ClinicalResearchService],
})
export class ClinicalResearchModule {}
