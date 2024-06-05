import { HttpService as NestHttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable,  } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { firstValueFrom } from "rxjs";

require('dotenv').config();

@Injectable()
export class HttpResearchersService {
    constructor(
        private readonly httpResearchersService: NestHttpService
    ) {}

    async getResearchersData(): Promise<AxiosResponse<any>> {
        const url = process.env.URL_RESEARCHERS
        const headers = {
            'X-Authorization': process.env.X_AUTH_VALUE_RESEARCHER
        };
        
         try {
             return firstValueFrom(this.httpResearchersService.get(url, { headers }));
         } catch (error) {
            throw new HttpException(
                `No se pudieron recuperar los datos: ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
         }
    }
}