import { Module } from '@nestjs/common';
import { ReportAnalystAssignmentService } from './services/report-analyst-assignment.service';
import { ReportAnalystAssignmentController } from './controllers/report-analyst-assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportAnalystAssignment } from './entities/report-analyst-assignment.entity';
import { Position } from '../position/entities/position.entity';
import { LogModule } from '../log/log.module';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    ReportAnalystAssignment,
    Position,
  ]),
  LogModule,
  CaseReportValidateModule,
],
  controllers: [ReportAnalystAssignmentController],
  providers: [ReportAnalystAssignmentService],
})
export class ReportAnalystAssignmentModule {}
