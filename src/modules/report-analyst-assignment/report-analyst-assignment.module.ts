import { Module } from '@nestjs/common';
import { ReportAnalystAssignmentService } from './services/report-analyst-assignment.service';
import { ReportAnalystAssignmentController } from './controllers/report-analyst-assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportAnalystAssignment } from './entities/report-analyst-assignment.entity';
import { LogModule } from '../log/log.module';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';
import { PositionModule } from '../position/position.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    ReportAnalystAssignment,
  ]),
  LogModule,
  CaseReportValidateModule,
  PositionModule,
],
  controllers: [ReportAnalystAssignmentController],
  providers: [ReportAnalystAssignmentService],
})
export class ReportAnalystAssignmentModule {}
