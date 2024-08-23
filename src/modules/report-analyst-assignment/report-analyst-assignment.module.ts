import { Module, forwardRef } from '@nestjs/common';
import { ReportAnalystAssignmentService } from './services/report-analyst-assignment.service';
import { ReportAnalystAssignmentController } from './controllers/report-analyst-assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportAnalystAssignment } from './entities/report-analyst-assignment.entity';
import { LogModule } from '../log/log.module';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';
import { PositionModule } from '../position/position.module';
import { HttpPositionService } from '../position/http/http-position.service';
import { HttpModule } from '@nestjs/axios';
import { CaseReportValidate } from '../case-report-validate/entities/case-report-validate.entity';
import { RoleResponseTime } from '../role-response-time/entities/role-response-time.entity';
import { RolePermission } from '../role-permission/entities/role-permission.entity';
import { CaseType } from '../case-type/entities/case-type.entity';
import { SeverityClasification } from '../severity-clasification/entities/severity-clasification.entity';
import { MovementReportModule } from '../movement-report/movement-report.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';
import { ReportResearcherAssignment } from '../report-researchers-assignment/entities/report-researchers-assignment.entity';
import { MovementReport } from '../movement-report/entities/movement-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportAnalystAssignment,
      CaseReportValidate,
      RolePermission,
      RoleResponseTime,
      CaseType,
      SeverityClasification,
      ReportResearcherAssignment,
      MovementReport,
    ]),
    LogModule,
    PositionModule,
    HttpModule,
    UserModule,
    forwardRef(() => CaseReportValidateModule),
  ],
  controllers: [ReportAnalystAssignmentController],
  providers: [
    ReportAnalystAssignmentService,
    HttpPositionService,
    PermissionGuard,
  ],
  exports: [ReportAnalystAssignmentService],
})
export class ReportAnalystAssignmentModule {}
