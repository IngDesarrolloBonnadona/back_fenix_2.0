import { Module } from '@nestjs/common';
import { CaseResponseTimeService } from './services/case-response-time.service';
import { CaseResponseTimeController } from './controllers/case-response-time.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseResponseTime } from './entities/case-response-time.entity';
import { SeverityClasificationModule } from '../severity-clasification/severity-clasification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CaseResponseTime]),
    SeverityClasificationModule,
  ],
  controllers: [CaseResponseTimeController],
  providers: [CaseResponseTimeService],
})
export class CaseResponseTimeModule {}
