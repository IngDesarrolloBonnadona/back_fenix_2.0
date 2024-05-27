import { Module } from '@nestjs/common';
import { CaseReportOriginalService } from './services/case-report-original.service';
import { CaseReportOriginalController } from './controllers/case-report-original.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseReportOriginal } from './entities/case-report-original.entity';
import { Device } from '../device/entities/device.entity';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';
import { CaseType } from '../case-type/entities/case-type.entity';
import { StatusReportModule } from '../status-report/status-report.module';
import { LogModule } from '../log/log.module';
import { MedicineModule } from '../medicine/medicine.module';
import { DeviceModule } from '../device/device.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CaseReportOriginal, 
      CaseType,
    ]),
    CaseReportValidateModule,
    StatusReportModule,
    LogModule,
    MedicineModule,
    DeviceModule
  ],
  controllers: [CaseReportOriginalController],
  providers: [CaseReportOriginalService],
})
export class CaseReportOriginalModule {}
