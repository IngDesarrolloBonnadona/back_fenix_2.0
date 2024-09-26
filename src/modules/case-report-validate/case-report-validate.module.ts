import { Module, forwardRef } from '@nestjs/common';
import { CaseReportValidateService } from './services/case-report-validate.service';
import { CaseReportValidateController } from './controllers/case-report-validate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseReportValidate } from './entities/case-report-validate.entity';
import { CaseType } from '../case-type/entities/case-type.entity';
import { MedicineModule } from '../medicine-case-report/medicine.module';
import { DeviceModule } from '../device-case-report/device.module';
import { MovementReport } from '../movement-report/entities/movement-report.entity';
import { LogModule } from '../log/log.module';
import { ReportAnalystAssignment } from '../report-analyst-assignment/entities/report-analyst-assignment.entity';
import { ReportAnalystAssignmentModule } from '../report-analyst-assignment/report-analyst-assignment.module';
import { Synergy } from '../synergy/entities/synergy.entity';
import { SynergyModule } from '../synergy/synergy.module';
import { ReportResearcherAssignment } from '../report-researchers-assignment/entities/report-researchers-assignment.entity';
import { ResearchersModule } from '../report-researchers-assignment/report-researchers-assignment.module';
import { CharacterizationCasesModule } from '../characterization-cases/characterization-cases.module';
import { RiskTypeModule } from '../risk-type/risk-type.module';
import { EventTypeModule } from '../event-type/event-type.module';
import { ServiceModule } from '../service/service.module';
import { EventModule } from '../event/event.module';
import { SeverityClasificationModule } from '../severity-clasification/severity-clasification.module';
import { OriginModule } from '../origin/origin.module';
import { SubOriginModule } from '../sub-origin/sub-origin.module';
import { RiskLevelModule } from '../risk-level/risk-level.module';
import { ObservationReturnCase } from '../observation-return-case/entities/observation-return-case.entity';
import { ObservationReturnCaseModule } from '../observation-return-case/observation-return-case.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CaseReportValidate,
      CaseType,
      MovementReport,
      ReportAnalystAssignment,
      Synergy,
      ReportResearcherAssignment,
      ObservationReturnCase,
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
    UserModule,
    forwardRef(() => ResearchersModule),
    forwardRef(() => ReportAnalystAssignmentModule),
    forwardRef(() => ObservationReturnCaseModule),
  ],
  controllers: [CaseReportValidateController],
  providers: [CaseReportValidateService, PermissionGuard],
  exports: [CaseReportValidateService],
})
export class CaseReportValidateModule {}
