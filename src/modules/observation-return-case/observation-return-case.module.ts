import { Module } from '@nestjs/common';
import { ObservationReturnCaseService } from './services/observation-return-case.service';
import { ObservationReturnCaseController } from './controllers/observation-return-case.controller';

@Module({
  controllers: [ObservationReturnCaseController],
  providers: [ObservationReturnCaseService],
})
export class ObservationReturnCaseModule {}
