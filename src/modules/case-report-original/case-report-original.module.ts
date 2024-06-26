import { Module } from '@nestjs/common';
import { CaseReportOriginalService } from './services/case-report-original.service';
import { CaseReportOriginalController } from './controllers/case-report-original.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseReportOriginal } from './entities/case-report-original.entity';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';
import { CaseType } from '../case-type/entities/case-type.entity';
import { LogModule } from '../log/log.module';
import { MedicineModule } from '../medicine/medicine.module';
import { DeviceModule } from '../device/device.module';
import { MovementReport } from '../movement-report/entities/movement-report.entity';
import { CaseTypeModule } from '../case-type/case-type.module';
import { RiskTypeModule } from '../risk-type/risk-type.module';
import { EventTypeModule } from '../event-type/event-type.module';
import { ServiceModule } from '../service/service.module';
import { EventModule } from '../event/event.module';
import { SeverityClasificationModule } from '../severity-clasification/severity-clasification.module';
import { OriginModule } from '../origin/origin.module';
import { SubOriginModule } from '../sub-origin/sub-origin.module';
import { RiskLevelModule } from '../risk-level/risk-level.module';
import { UnitModule } from '../unit/unit.module';
import { PriorityModule } from '../priority/priority.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CaseReportOriginal, 
      CaseType,
      MovementReport,
    ]),
    CaseReportValidateModule,
    LogModule,
    MedicineModule,
    DeviceModule,
    CaseTypeModule,
    RiskTypeModule,
    EventTypeModule,
    EventModule,
    ServiceModule,
    SeverityClasificationModule,
    OriginModule,
    SubOriginModule,
    RiskLevelModule,
    UnitModule,
    PriorityModule,
  ],
  controllers: [CaseReportOriginalController],
  providers: [CaseReportOriginalService],
})
export class CaseReportOriginalModule {}
