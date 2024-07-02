import { Module, forwardRef } from '@nestjs/common';
import { ObservationReturnCaseService } from './services/observation-return-case.service';
import { ObservationReturnCaseController } from './controllers/observation-return-case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservationReturnCase } from './entities/observation-return-case.entity';
import { ReasonReturnCaseModule } from '../reason-return-case/reason-return-case.module';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObservationReturnCase]),
    ReasonReturnCaseModule,
    forwardRef(() => CaseReportValidateModule),
  ],
  controllers: [ObservationReturnCaseController],
  providers: [ObservationReturnCaseService],
  exports: [ObservationReturnCaseService]
})
export class ObservationReturnCaseModule {}
