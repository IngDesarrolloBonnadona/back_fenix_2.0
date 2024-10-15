import { Controller, Get, Param, Post } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('/infoPatient/:idNumber/:type')
  infoPatient(
    @Param('idNumber') idNumber: string,
    @Param('type') type: string,
  ) {
    return this.patientService.getPatient(idNumber, type);
  }
}
