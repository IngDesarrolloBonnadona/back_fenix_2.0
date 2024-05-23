import { plainToInstance } from "class-transformer";
import { CreateOriAdverseEventReportDto } from "../../dto/create-ori-adverse-event-report.dto";
import { CreateOriComplicationsReportDto } from "../../dto/create-ori-complications-report.dto";
import { CreateOriIncidentReportDto } from "../../dto/create-ori-incident-report.dto";
import { CreateOriIndicatingUnsafeCareReportDto } from "../../dto/create-ori-indicating-unsafe-care-report.dto";
import { CreateOriRiskReportDto } from "../../dto/create-ori-risk-report.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { validate } from "class-validator";

export type CreateReportDto = //Discriminador que define los Dto
    CreateOriAdverseEventReportDto
  | CreateOriComplicationsReportDto
  | CreateOriIncidentReportDto
  | CreateOriIndicatingUnsafeCareReportDto
  | CreateOriRiskReportDto;

export async function dtoValidator(createReportDto: any): Promise<CreateReportDto> {
    let dtoInstance: CreateReportDto;

    switch (createReportDto.ori_cr_casetype_id_fk) {
        case 1:
          dtoInstance = plainToInstance(CreateOriRiskReportDto, createReportDto);
          break
        case 2:
          dtoInstance = plainToInstance(CreateOriAdverseEventReportDto, createReportDto);
          break;
        case 3:
          dtoInstance = plainToInstance(CreateOriIncidentReportDto, createReportDto);
          break;
        case 4:
          dtoInstance = plainToInstance(CreateOriIndicatingUnsafeCareReportDto, createReportDto);
          break;
        case 5:
          dtoInstance = plainToInstance(CreateOriComplicationsReportDto, createReportDto);
          break;
        default:
          throw new HttpException('Tipo de caso no reconocido.', HttpStatus.BAD_REQUEST);
      }

      const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new HttpException(
        `Validación fallida: ${errors.map(error => error.toString()).join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return dtoInstance
}