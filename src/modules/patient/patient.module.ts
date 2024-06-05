import { Module } from '@nestjs/common';
import { PatientService } from './services/patient.service';
import { PatientController } from './controllers/patient.controller';
import { HttpModule } from '@nestjs/axios';
import { HttPatientService } from './http/http-patient.service';

@Module({
  imports: [HttpModule],
  controllers: [PatientController],
  providers: [PatientService, HttPatientService],
})
export class PatientModule {}
