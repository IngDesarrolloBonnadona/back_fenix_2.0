import { Module } from '@nestjs/common';
import { RiskLevelService } from './services/risk-level.service';
import { RiskLevelController } from './controllers/risk-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskLevel } from './entities/risk-level.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RiskLevel])
  ],
  controllers: [RiskLevelController],
  providers: [RiskLevelService],
  exports: [RiskLevelService],
})
export class RiskLevelModule {}
