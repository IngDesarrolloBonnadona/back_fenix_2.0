import { HttpService as NestHttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

require('dotenv').config();

@Injectable()
export class HttpPatientService {
  constructor(private readonly httpPatientService: NestHttpService) {}

  async getPatientData(
    idNumber: string,
    type: string,
  ) {
    try {
      const url = `${process.env.URL_PATIENTS}/${idNumber}/${type}`;

      const response = firstValueFrom(
        this.httpPatientService.get(url, {
          headers: {
            'X-Authorization': process.env.X_TOKEN_VALUE_PATIENT,
          },
        }),
      );

      return response;
    } catch (error) {
      throw new HttpException(
        `Hubo un error al consultar en la base de datos: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
