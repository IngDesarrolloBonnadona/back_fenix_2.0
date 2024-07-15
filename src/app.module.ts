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
import { MedicineModule } from './modules/medicine/medicine.module';
import { DeviceModule } from './modules/device/device.module';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
