import { HttpService as NestHttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

require('dotenv').config();

@Injectable()
export class HttpResearchersService {
  constructor(private readonly httpResearchersService: NestHttpService) {}

  async getResearchersData() {
    try {
      const url = process.env.URL_RESEARCHERS;
      const response = firstValueFrom(
        this.httpResearchersService.get(url, {
          headers: {
            'X-Authorization': process.env.X_TOKEN_VALUE_RESEARCHER,
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

  // async getResearchersData() {
  //     try {
  //         const URL = process.env.URL_RESEARCHERS

  //         const response = await axios.get(URL,
  //             {
  //                 headers: {
  //                     'X-Authorization': process.env.X_TOKEN_VALUE_RESEARCHER
  //                 }
  //             }
  //         );

  //         const allData = response.data;

  //         return allData
  //     } catch (error) {
  //         throw new HttpException(
  //             `Hubo un error al consultar en la base de datos: ${error}`,
  //             HttpStatus.INTERNAL_SERVER_ERROR
  //         );
  //     }
  // }
}
