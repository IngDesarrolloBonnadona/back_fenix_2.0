import { Module } from '@nestjs/common';
import { ReasonReturnCaseService } from './services/reason-return-case.service';
import { ReasonReturnCaseController } from './controllers/reason-return-case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReasonReturnCase } from './entities/reason-return-case.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReasonReturnCase])],
  controllers: [ReasonReturnCaseController],
  providers: [ReasonReturnCaseService],
})
export class ReasonReturnCaseModule {}
