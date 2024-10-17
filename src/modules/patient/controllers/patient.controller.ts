import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { ApiTags } from '@nestjs/swagger';
import { PatientDto } from '../dto/patient.dto';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/infoPatient')
  infoPatient(
    @Body() patientDto: PatientDto,
  ) {
    return this.patientService.getPatient(patientDto);
  }
}
