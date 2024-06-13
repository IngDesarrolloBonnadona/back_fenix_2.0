import { Module } from '@nestjs/common';
import { ResearchersService } from './services/researchers.service';
import { ResearchersController } from './controllers/researchers.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpResearchersService } from './http/http-researchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Researcher } from './entities/researchers.entity';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';
import { ReportAnalystAssignmentModule } from '../report-analyst-assignment/report-analyst-assignment.module';
import { LogModule } from '../log/log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Researcher]),
    HttpModule,
    CaseReportValidateModule,
    ReportAnalystAssignmentModule,
    LogModule,
  ],
  controllers: [ResearchersController],
  providers: [ResearchersService, HttpResearchersService],
})
export class ResearchersModule {}
