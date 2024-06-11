import { Module, forwardRef } from '@nestjs/common';
import { CaseReportValidateService } from './services/case-report-validate.service';
import { CaseReportValidateController } from './controllers/case-report-validate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseReportValidate } from './entities/case-report-validate.entity';
import { CaseType } from '../case-type/entities/case-type.entity';
import { MedicineModule } from '../medicine/medicine.module';
import { DeviceModule } from '../device/device.module';
import { MovementReport } from '../movement-report/entities/movement-report.entity';
import { StatusReportModule } from '../status-report/status-report.module';
import { LogModule } from '../log/log.module';
import { ReportAnalystAssignment } from '../report-analyst-assignment/entities/report-analyst-assignment.entity';
import { ReportAnalystAssignmentModule } from '../report-analyst-assignment/report-analyst-assignment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CaseReportValidate,
      CaseType,
      MovementReport,
      ReportAnalystAssignment
    ]),
    MedicineModule,
    DeviceModule,
    StatusReportModule,
    LogModule,
    forwardRef(() => ReportAnalystAssignmentModule),
  ],
  controllers: [CaseReportValidateController],
  providers: [CaseReportValidateService],
  exports: [CaseReportValidateService]
})
export class CaseReportValidateModule {}
