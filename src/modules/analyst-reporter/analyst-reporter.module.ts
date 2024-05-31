import { Module } from '@nestjs/common';
import { AnalystReporterService } from './services/analyst-reporter.service';
import { AnalystReporterController } from './controllers/analyst-reporter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalystReporter } from './entities/analyst-reporter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalystReporter])
  ],
  controllers: [AnalystReporterController],
  providers: [AnalystReporterService],
})
export class AnalystReporterModule {}
