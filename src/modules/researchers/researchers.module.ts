import { Module, forwardRef } from '@nestjs/common';
import { ResearchersService } from './services/researchers.service';
import { ResearchersController } from './controllers/researchers.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpResearchersService } from './http/http-researchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Researcher } from './entities/researchers.entity';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';
import { LogModule } from '../log/log.module';
import { MovementReport } from '../movement-report/entities/movement-report.entity';
import { CaseReportValidate } from '../case-report-validate/entities/case-report-validate.entity';
import { CaseType } from '../case-type/entities/case-type.entity';
import { SeverityClasification } from '../severity-clasification/entities/severity-clasification.entity';
import { Role } from '../role/entities/role.entity';
import { RoleResponseTime } from '../role-response-time/entities/role-response-time.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Researcher,
      MovementReport,
      CaseReportValidate,
      CaseType,
      SeverityClasification,
      Role,
      RoleResponseTime
    ]),
    HttpModule,
    LogModule,
    forwardRef(() => CaseReportValidateModule),
  ],
  controllers: [ResearchersController],
  providers: [ResearchersService, HttpResearchersService],
  exports: [ResearchersService],
})
export class ResearchersModule {}
