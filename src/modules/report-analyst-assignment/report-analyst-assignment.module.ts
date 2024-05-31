import { Module } from '@nestjs/common';
import { ReportAnalystAssignmentService } from './services/report-analyst-assignment.service';
import { ReportAnalystAssignmentController } from './controllers/report-analyst-assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportAnalystAssignment } from './entities/report-analyst-assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportAnalystAssignment])],
  controllers: [ReportAnalystAssignmentController],
  providers: [ReportAnalystAssignmentService],
})
export class ReportAnalystAssignmentModule {}
