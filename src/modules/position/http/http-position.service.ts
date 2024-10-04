import { HttpService as NestHttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

require('dotenv').config();

@Injectable()
export class HttpPositionService {
  constructor(private readonly httpPositionService: NestHttpService) {}

  async getPositionData(code?: number) {
    try {
      let url = process.env.URL_POSITIONS;

      if (code) {
        url = `${url}/${code}`;
      }

      const response = firstValueFrom(
        this.httpPositionService.get(url, {
          headers: {
            'X-Authorization': process.env.X_TOKEN_VALUE_POSITION,
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
