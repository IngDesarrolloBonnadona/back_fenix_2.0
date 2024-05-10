import { Module } from '@nestjs/common';
import { CaseReportValidateService } from './services/case-report-validate.service';
import { CaseReportValidateController } from './controllers/case-report-validate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseReportValidate } from './entities/case-report-validate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CaseReportValidate])
  ],
  controllers: [CaseReportValidateController],
  providers: [CaseReportValidateService],
})
export class CaseReportValidateModule {}
