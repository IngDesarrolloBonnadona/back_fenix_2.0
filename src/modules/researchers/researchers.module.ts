import { Module, forwardRef } from '@nestjs/common';
import { ResearchersService } from './services/researchers.service';
import { ResearchersController } from './controllers/researchers.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpResearchersService } from './http/http-researchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Researcher } from './entities/researchers.entity';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';
import { LogModule } from '../log/log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Researcher]),
    HttpModule,
    LogModule,
    forwardRef(() => CaseReportValidateModule),
  ],
  controllers: [ResearchersController],
  providers: [ResearchersService, HttpResearchersService],
  exports: [ResearchersService]
})
export class ResearchersModule {}
