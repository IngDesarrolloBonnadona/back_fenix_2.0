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
    idType: string,
  ): Promise<AxiosResponse<any>> {
    try {
      const url = `${process.env.URL_PATIENTS}/${idNumber}/${idType}`;

      const response = firstValueFrom(
        this.httpPatientService.get(url, {
          headers: {
            'X-Authorization': process.env.X_AUTH_VALUE_PATIENT,
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
