import { Module, forwardRef } from '@nestjs/common';
import { ResearchersService } from './services/report-researchers-assignment.service';
import { ReportResearchersAssignmentController } from './controllers/report-researchers-assignment.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpResearchersService } from './http/http-researchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportResearcherAssignment } from './entities/report-researchers-assignment.entity';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';
import { LogModule } from '../log/log.module';
import { MovementReport } from '../movement-report/entities/movement-report.entity';
import { CaseReportValidate } from '../case-report-validate/entities/case-report-validate.entity';
import { CaseType } from '../case-type/entities/case-type.entity';
import { SeverityClasification } from '../severity-clasification/entities/severity-clasification.entity';
import { Role } from '../role/entities/role.entity';
import { RoleResponseTime } from '../role-response-time/entities/role-response-time.entity';
import { ReportAnalystAssignment } from '../report-analyst-assignment/entities/report-analyst-assignment.entity';
import { MovementReportModule } from '../movement-report/movement-report.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportResearcherAssignment,
      // MovementReport,
      CaseReportValidate,
      CaseType,
      SeverityClasification,
      Role,
      RoleResponseTime,
      ReportAnalystAssignment,
    ]),
    HttpModule,
    LogModule,
    MovementReportModule,
    forwardRef(() => CaseReportValidateModule),
  ],
  controllers: [ReportResearchersAssignmentController],
  providers: [ResearchersService, HttpResearchersService],
  exports: [ResearchersService],
})
export class ResearchersModule {}
