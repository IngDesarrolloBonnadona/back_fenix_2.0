import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PatientDto } from '../dto/patient.dto';
import { HttPatientService } from '../http/http-patient.service';

@Injectable()
export class PatientService {
  constructor(private readonly httpPatientService: HttPatientService) {}

  async getPatient(idNumber: string, idType: string) {
    const response = await this.httpPatientService.getPatientData(
      idNumber,
      idType,
    );
    const patient = response.data;

    if (patient.data.length === 0) {
      throw new HttpException(
        'No se encontraron datos del paciente.',
        HttpStatus.NOT_FOUND,
      );
    }

    return patient;
  }
}
