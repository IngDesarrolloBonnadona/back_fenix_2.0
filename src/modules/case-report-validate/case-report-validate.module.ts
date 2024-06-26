import { Module, forwardRef } from '@nestjs/common';
import { CaseReportValidateService } from './services/case-report-validate.service';
import { CaseReportValidateController } from './controllers/case-report-validate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseReportValidate } from './entities/case-report-validate.entity';
import { CaseType } from '../case-type/entities/case-type.entity';
import { MedicineModule } from '../medicine/medicine.module';
import { DeviceModule } from '../device/device.module';
import { MovementReport } from '../movement-report/entities/movement-report.entity';
import { LogModule } from '../log/log.module';
import { ReportAnalystAssignment } from '../report-analyst-assignment/entities/report-analyst-assignment.entity';
import { ReportAnalystAssignmentModule } from '../report-analyst-assignment/report-analyst-assignment.module';
import { Synergy } from '../synergy/entities/synergy.entity';
import { SynergyModule } from '../synergy/synergy.module';
import { Researcher } from '../researchers/entities/researchers.entity';
import { ResearchersModule } from '../researchers/researchers.module';
import { CharacterizationCasesModule } from '../characterization-cases/characterization-cases.module';
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
      CaseReportValidate,
      CaseType,
      MovementReport,
      ReportAnalystAssignment,
      Synergy,
      Researcher,
    ]),
    MedicineModule,
    DeviceModule,
    LogModule,
    SynergyModule,
    CharacterizationCasesModule,
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
    forwardRef(() => ResearchersModule),
    forwardRef(() => ReportAnalystAssignmentModule),
  ],
  controllers: [CaseReportValidateController],
  providers: [CaseReportValidateService],
  exports: [CaseReportValidateService]
})
export class CaseReportValidateModule {}
