import { Module } from '@nestjs/common';
import { PatientService } from './services/patient.service';
import { PatientController } from './controllers/patient.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpPatientService } from './http/http-patient.service';

@Module({
  imports: [HttpModule],
  controllers: [PatientController],
  providers: [PatientService, HttpPatientService],
})
export class PatientModule {}
