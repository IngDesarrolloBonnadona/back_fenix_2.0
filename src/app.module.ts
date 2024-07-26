import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseReportOriginalModule } from './modules/case-report-original/case-report-original.module';
import { CaseTypeModule } from './modules/case-type/case-type.module';
import { RiskTypeModule } from './modules/risk-type/risk-type.module';
import { SeverityClasificationModule } from './modules/severity-clasification/severity-clasification.module';
import { OriginModule } from './modules/origin/origin.module';
import { SubOriginModule } from './modules/sub-origin/sub-origin.module';
import { RiskLevelModule } from './modules/risk-level/risk-level.module';
import { EventTypeModule } from './modules/event-type/event-type.module';
import { EventModule } from './modules/event/event.module';
import { MedicineModule } from './modules/medicine-case-report/medicine.module';
import { DeviceModule } from './modules/device-case-report/device.module';
import { ServiceModule } from './modules/service/service.module';
import { UnitModule } from './modules/unit/unit.module';
import { CaseReportValidateModule } from './modules/case-report-validate/case-report-validate.module';
import { MovementReportModule } from './modules/movement-report/movement-report.module';
import { LogModule } from './modules/log/log.module';
import { PositionModule } from './modules/position/position.module';
import { ReportAnalystAssignmentModule } from './modules/report-analyst-assignment/report-analyst-assignment.module';
import { ResearchersModule } from './modules/report-researchers-assignment/report-researchers-assignment.module';
import { PatientModule } from './modules/patient/patient.module';
import { SynergyModule } from './modules/synergy/synergy.module';
import { PriorityModule } from './modules/priority/priority.module';
import { CharacterizationCasesModule } from './modules/characterization-cases/characterization-cases.module';
import { RoleResponseTimeModule } from './modules/role-response-time/role-response-time.module';
import { ReasonReturnCaseModule } from './modules/reason-return-case/reason-return-case.module';
import { RolePermissionModule } from './modules/role-permission/role-permission.module';
import { ObservationReturnCaseModule } from './modules/observation-return-case/observation-return-case.module';
import { UserModule } from './modules_bonnadonahub/user/user.module';
import { ActionPlanModule } from './modules/action-plan/action-plan.module';
import { ActionPlanActivitiesModule } from './modules/action-plan-activities/action-plan-activities.module';
import { ActionPlanCaseReportValidateModule } from './modules/action-plan-case-report-validate/action-plan-case-report-validate.module';
import { ResearchInstrumentModule } from './modules/research-instrument/research-instrument.module';
import { DeviceTypeModule } from './modules/device-type/device-type.module';
import { DamageTypeModule } from './modules/damage-type/damage-type.module';
import { FluidTypeModule } from './modules/fluid-type/fluid-type.module';
import { InfluencingFactorModule } from './modules/influencing-factor/influencing-factor.module';
import { FailedMeasuresModule } from './modules/failed-measures/failed-measures.module';
import { RiskFactorModule } from './modules/risk-factor/risk-factor.module';
import { SafetyBarriersModule } from './modules/safety-barriers/safety-barriers.module';
import { ClinicalResearchInfluencingFactorModule } from './modules/clinical-research-influencing-factor/clinical-research-influencing-factor.module';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.BONNADONA_HOST,
      port: +process.env.BONNADONA_PORT,
      username: process.env.BONNADONA_USER,
      password: process.env.BONNADONA_PASSWORD,
      database: process.env.BONNADONA_DATABASE,
      entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forRoot({
      name: 'bonnadonaHub',
      type: 'postgres',
      host: process.env.BONNADONA_HOST,
      port: +process.env.BONNADONA_PORT,
      username: process.env.BONNADONA_USER,
      password: process.env.BONNADONA_PASSWORD,
      database: process.env.BONNADONA_DATABASE,
      entities: [
        __dirname + '/modules_bonnadonahub/user/entities/*.entity{.ts,.js}',
      ],
      synchronize: false,
    }),
    CaseReportOriginalModule,
    CaseTypeModule,
    RiskTypeModule,
    SeverityClasificationModule,
    OriginModule,
    SubOriginModule,
    RiskLevelModule,
    EventTypeModule,
    EventModule,
    MedicineModule,
    DeviceModule,
    ServiceModule,
    UnitModule,
    CaseReportValidateModule,
    MovementReportModule,
    LogModule,
    PositionModule,
    ReportAnalystAssignmentModule,
    ResearchersModule,
    PatientModule,
    SynergyModule,
    PriorityModule,
    CharacterizationCasesModule,
    RoleResponseTimeModule,
    ReasonReturnCaseModule,
    RolePermissionModule,
    ObservationReturnCaseModule,
    UserModule,
    ActionPlanModule,
    ActionPlanActivitiesModule,
    ActionPlanCaseReportValidateModule,
    ResearchInstrumentModule,
    DeviceTypeModule,
    DamageTypeModule,
    FluidTypeModule,
    InfluencingFactorModule,
    FailedMeasuresModule,
    RiskFactorModule,
    SafetyBarriersModule,
    ClinicalResearchInfluencingFactorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
