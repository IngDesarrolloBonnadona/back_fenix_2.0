import { Module } from '@nestjs/common';
import { SynergyService } from './services/synergy.service';
import { SynergyController } from './controllers/synergy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Synergy } from './entities/synergy.entity';
import { CaseType } from '../case-type/entities/case-type.entity';
import { LogModule } from '../log/log.module';
import { CaseReportValidate } from '../case-report-validate/entities/case-report-validate.entity';
import { MovementReport } from '../movement-report/entities/movement-report.entity';
import { MovementReportModule } from '../movement-report/movement-report.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Synergy,
      CaseType,
      CaseReportValidate,
    ]),
    LogModule,
    MovementReportModule,
  ],
  controllers: [SynergyController],
  providers: [SynergyService],
  exports: [SynergyService],
})
export class SynergyModule {}
