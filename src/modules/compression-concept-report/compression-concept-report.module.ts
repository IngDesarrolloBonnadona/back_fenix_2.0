import { Module } from '@nestjs/common';
import { CompressionConceptReportService } from './services/compression-concept-report.service';
import { CompressionConceptReportController } from './controllers/compression-concept-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompressionConceptReport } from './entities/compression-concept-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompressionConceptReport])
  ],
  controllers: [CompressionConceptReportController],
  providers: [CompressionConceptReportService],
})
export class CompressionConceptReportModule {}
