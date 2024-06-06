import { Body, Controller, Post } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { PatientDto } from '../dto/patient.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/infoPatient/')
  infoPatient(@Body() patientDto: PatientDto) {
    const { idNumber, idType } = patientDto;
    return this.patientService.getPatient(idNumber, idType);
  }
}
