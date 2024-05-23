import { Module } from '@nestjs/common';
import { StatusReportService } from './services/status-report.service';
import { StatusReportController } from './controllers/status-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusReport } from './entities/status-report.entity';
import { MovementReport } from '../movement-report/entities/movement-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StatusReport,
      MovementReport
    ])
  ],
  controllers: [StatusReportController],
  providers: [StatusReportService],
  exports: [StatusReportService]
})
export class StatusReportModule {}
