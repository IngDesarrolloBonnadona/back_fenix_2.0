import { Module } from '@nestjs/common';
import { RiskTypeService } from './risk-type.service';
import { RiskTypeController } from './risk-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskType } from './entities/risk-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RiskType])
  ],
  controllers: [RiskTypeController],
  providers: [RiskTypeService],
})
export class RiskTypeModule {}
