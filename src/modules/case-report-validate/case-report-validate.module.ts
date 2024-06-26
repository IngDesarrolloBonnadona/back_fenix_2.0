import { Module, forwardRef } from '@nestjs/common';
import { CaseReportValidateService } from './services/case-report-validate.service';
import { CaseReportValidateController } from './controllers/case-report-validate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseReportValidate } from './entities/case-report-validate.entity';
import { CaseType } from '../case-type/entities/case-type.entity';
import { MedicineModule } from '../medicine/medicine.module';
import { DeviceModule } from '../device/device.module';
import { MovementReport } from '../movement-report/entities/movement-report.entity';
import { LogModule } from '../log/log.module';
import { ReportAnalystAssignment } from '../report-analyst-assignment/entities/report-analyst-assignment.entity';
import { ReportAnalystAssignmentModule } from '../report-analyst-assignment/report-analyst-assignment.module';
import { Synergy } from '../synergy/entities/synergy.entity';
import { SynergyModule } from '../synergy/synergy.module';
import { Researcher } from '../researchers/entities/researchers.entity';
import { ResearchersModule } from '../researchers/researchers.module';
import { CharacterizationCase } from '../characterization-cases/entities/characterization-case.entity';
import { CharacterizationCasesModule } from '../characterization-cases/characterization-cases.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CaseReportValidate,
      CaseType,
      MovementReport,
      ReportAnalystAssignment,
      Synergy,
      Researcher,
      CharacterizationCase,
    ]),
    MedicineModule,
    DeviceModule,
    LogModule,
    SynergyModule,
    CharacterizationCasesModule,
    forwardRef(() => ResearchersModule),
    forwardRef(() => ReportAnalystAssignmentModule),
  ],
  controllers: [CaseReportValidateController],
  providers: [CaseReportValidateService],
  exports: [CaseReportValidateService]
})
export class CaseReportValidateModule {}
