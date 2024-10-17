import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpPatientService } from '../http/http-patient.service';
import { PatientDto } from '../dto/patient.dto';

@Injectable()
export class PatientService {
  constructor(private readonly httpPatientService: HttpPatientService) {}

  async getPatient(patientDto: PatientDto) {
    if (!patientDto.idNumber) {
      throw new HttpException(
        'El numero de identificación del paciente es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!patientDto.type) {
      throw new HttpException(
        'El tipo de identificación del paciente es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await this.httpPatientService.getPatientData(
      patientDto.idNumber,
      patientDto.type,
    );
    const patient = response.data?.data;

    if (!Array.isArray(patient) || patient.length === 0) {
      throw new HttpException(
        'No se encontraron datos del paciente.',
        HttpStatus.NOT_FOUND,
      );
    }

    return patient[0];
  }
}
