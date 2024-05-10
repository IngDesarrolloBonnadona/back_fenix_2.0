import { Module } from '@nestjs/common';
import { StatusReportService } from './services/status-report.service';
import { StatusReportController } from './controllers/status-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusReport } from './entities/status-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StatusReport])
  ],
  controllers: [StatusReportController],
  providers: [StatusReportService],
})
export class StatusReportModule {}
