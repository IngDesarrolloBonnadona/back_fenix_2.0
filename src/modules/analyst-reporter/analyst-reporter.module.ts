import { Module } from '@nestjs/common';
import { AnalystReporterService } from './services/analyst-reporter.service';
import { AnalystReporterController } from './controllers/analyst-reporter.controller';

@Module({
  controllers: [AnalystReporterController],
  providers: [AnalystReporterService],
})
export class AnalystReporterModule {}
