import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { StatusReportModule } from './modules/status-report/status-report.module';
import { MovementReportModule } from './modules/movement-report/movement-report.module';
// import { IpClientMiddleware } from './middlewares/ip-client.middleware';
import { LogModule } from './modules/log/log.module';
import { PositionModule } from './modules/position/position.module';
import { ReportAnalystAssignmentModule } from './modules/report-analyst-assignment/report-analyst-assignment.module';
import { ResearchersModule } from './modules/researchers/researchers.module';
import { PatientModule } from './modules/patient/patient.module';
import { SynergyModule } from './modules/synergy/synergy.module';
import { PriorityModule } from './modules/priority/priority.module';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
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
    StatusReportModule,
    MovementReportModule,
    LogModule,
    PositionModule,
    ReportAnalystAssignmentModule,
    ResearchersModule,
    PatientModule,
    SynergyModule,
    PriorityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
