import { Module } from '@nestjs/common';
import { CaseResponseTimeService } from './services/case-response-time.service';
import { CaseResponseTimeController } from './controllers/case-response-time.controller';

@Module({
  controllers: [CaseResponseTimeController],
  providers: [CaseResponseTimeService],
})
export class CaseResponseTimeModule {}
