import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PatientDto } from '../dto/patient.dto';
import { HttpPatientService } from '../http/http-patient.service';

@Injectable()
export class PatientService {
  constructor(private readonly httpPatientService: HttpPatientService) {}

  async getPatient(idNumber: string, idType: string) {
    const response = await this.httpPatientService.getPatientData(
      idNumber,
      idType,
    );
    const patient = response.data.data;

    if (patient.length === 0) {
      throw new HttpException(
        'No se encontraron datos del paciente.',
        HttpStatus.NO_CONTENT,
      );
    }

    return patient;
  }
}
