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
import { RolePermission } from '../role-permission/entities/role-permission.entity';
import { RoleResponseTime } from '../role-response-time/entities/role-response-time.entity';
import { ReportAnalystAssignment } from '../report-analyst-assignment/entities/report-analyst-assignment.entity';
import { MovementReportModule } from '../movement-report/movement-report.module';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportResearcherAssignment,
      MovementReport,
      CaseReportValidate,
      CaseType,
      SeverityClasification,
      RolePermission,
      RoleResponseTime,
      ReportAnalystAssignment,
    ]),
    HttpModule,
    LogModule,
    // MovementReportModule,
    UserModule,
    forwardRef(() => CaseReportValidateModule),
  ],
  controllers: [ReportResearchersAssignmentController],
  providers: [ResearchersService, HttpResearchersService, PermissionGuard],
  exports: [ResearchersService],
})
export class ResearchersModule {}
