import { Module } from '@nestjs/common';
import { MovementReportService } from './movement-report.service';
import { MovementReportController } from './movement-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementReport } from './entities/movement-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovementReport])
  ],
  controllers: [MovementReportController],
  providers: [MovementReportService],
})
export class MovementReportModule {}
