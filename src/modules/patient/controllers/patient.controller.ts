import { Controller, Get, Param } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { PatientDto } from '../dto/patient.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('/infoPatient/:idNumber/:idType')
  infoPatient(@Param() { idNumber, idType }: PatientDto) {
    return this.patientService.getPatient(idNumber, idType);
  }
}
