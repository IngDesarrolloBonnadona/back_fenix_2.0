import { Module } from '@nestjs/common';
import { InfluencingFactorService } from './services/influencing-factor.service';
import { InfluencingFactorController } from './controllers/influencing-factor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfluencingFactor } from './entities/influencing-factor.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([InfluencingFactor]), UserModule],
  controllers: [InfluencingFactorController],
  providers: [InfluencingFactorService],
  exports: [InfluencingFactorService],
})
export class InfluencingFactorModule {}
