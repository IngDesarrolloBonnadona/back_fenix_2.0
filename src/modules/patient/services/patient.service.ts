import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpPatientService } from '../http/http-patient.service';

@Injectable()
export class PatientService {
  constructor(private readonly httpPatientService: HttpPatientService) {}

  async getPatient(idNumber: string, idType: string) {
    if (!idNumber) {
      throw new HttpException(
        'El numero de identificación del paciente es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idType) {
      throw new HttpException(
        'El tipo de identificación del paciente es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.httpPatientService.getPatientData(
      idNumber,
      idType,
    );
    const patient = response.data.data;

    if (patient.length === 0) {
      throw new HttpException(
        'No se encontraron datos del paciente.',
        HttpStatus.NOT_FOUND,
      );
    }

    return patient;
  }
}
