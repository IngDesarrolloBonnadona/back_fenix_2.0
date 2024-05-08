import { Module } from '@nestjs/common';
import { RiskLevelService } from './risk-level.service';
import { RiskLevelController } from './risk-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskLevel } from './entities/risk-level.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RiskLevel])
  ],
  controllers: [RiskLevelController],
  providers: [RiskLevelService],
})
export class RiskLevelModule {}
