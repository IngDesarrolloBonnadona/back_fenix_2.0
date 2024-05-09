import { Module } from '@nestjs/common';
import { CaseReportOriginalService } from './services/case-report-original.service';
import { CaseReportOriginalController } from './controllers/case-report-original.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseReportOriginal } from './entities/case-report-original.entity';
import { CaseReportValidate } from '../case-report-validate/entities/case-report-validate.entity';
import { Medicine } from '../medicine/entities/medicine.entity';
import { Device } from '../device/entities/device.entity';
import { StatusReport } from '../status-report/entities/status-report.entity';
import { MovementReport } from '../movement-report/entities/movement-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CaseReportOriginal, 
      CaseReportValidate,
      Medicine,
      Device,
      StatusReport,
      MovementReport
    ]),
  ],
  controllers: [CaseReportOriginalController],
  providers: [CaseReportOriginalService],
})
export class CaseReportOriginalModule {}
