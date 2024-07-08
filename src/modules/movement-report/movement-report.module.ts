import { Module } from '@nestjs/common';
import { MovementReportService } from './services/movement-report.service';
import { MovementReportController } from './controllers/movement-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementReport } from './entities/movement-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovementReport])
  ],
  controllers: [MovementReportController],
  providers: [MovementReportService],
  exports: [MovementReportService],
})
export class MovementReportModule {}
