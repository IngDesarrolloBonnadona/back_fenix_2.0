import { Module } from '@nestjs/common';
import { RiskFactorService } from './services/risk-factor.service';
import { RiskFactorController } from './controllers/risk-factor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskFactor } from './entities/risk-factor.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RiskFactor]), UserModule],
  controllers: [RiskFactorController],
  providers: [RiskFactorService],
  exports: [RiskFactorService],
})
export class RiskFactorModule {}
