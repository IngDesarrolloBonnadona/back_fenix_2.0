import { Module } from '@nestjs/common';
import { SynergyService } from './services/synergy.service';
import { SynergyController } from './controllers/synergy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Synergy } from './entities/synergy.entity';
import { CaseType } from '../case-type/entities/case-type.entity';
import { LogModule } from '../log/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Synergy,
    CaseType
  ]),
  LogModule
],
  controllers: [SynergyController],
  providers: [SynergyService],
})
export class SynergyModule {}
