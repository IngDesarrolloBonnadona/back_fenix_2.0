import { Module, forwardRef } from '@nestjs/common';
import { ObservationReturnCaseService } from './services/observation-return-case.service';
import { ObservationReturnCaseController } from './controllers/observation-return-case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservationReturnCase } from './entities/observation-return-case.entity';
import { ReasonReturnCaseModule } from '../reason-return-case/reason-return-case.module';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObservationReturnCase]),
    ReasonReturnCaseModule,
    UserModule,
    forwardRef(() => CaseReportValidateModule),
  ],
  controllers: [ObservationReturnCaseController],
  providers: [ObservationReturnCaseService, PermissionGuard],
  exports: [ObservationReturnCaseService],
})
export class ObservationReturnCaseModule {}
