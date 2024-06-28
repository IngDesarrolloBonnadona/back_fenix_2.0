import { Module } from '@nestjs/common';
import { ReasonReturnCaseService } from './services/reason-return-case.service';
import { ReasonReturnCaseController } from './controllers/reason-return-case.controller';

@Module({
  controllers: [ReasonReturnCaseController],
  providers: [ReasonReturnCaseService],
})
export class ReasonReturnCaseModule {}
