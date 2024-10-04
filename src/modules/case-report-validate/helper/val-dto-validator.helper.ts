import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateValAdverseEventReportDto } from '../dto/create-val-adverse-event-report.dto';
import { CreateValComplicationsReportDto } from '../dto/create-val-complications-report.dto';
import { CreateValIncidentReportDto } from '../dto/create-val-incident-report.dto';
import { CreateValIndicatingUnsafeCareReportDto } from '../dto/create-val-indicating-unsafe-care-report.dto';
import { CreateValRiskReportDto } from '../dto/create-val-risk-report.dto';
import { caseTypeReport } from 'src/utils/enums/caseType-report.enum';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CaseType } from 'src/modules/case-type/entities/case-type.entity';

export type CreateReportValDto =
  | CreateValAdverseEventReportDto
  | CreateValComplicationsReportDto
  | CreateValIncidentReportDto
  | CreateValIndicatingUnsafeCareReportDto
  | CreateValRiskReportDto;

export async function ValDtoValidator(
  createReportValDto: any,
  caseTypeRepository: Repository<CaseType>,
) {
  let dtoInstance: CreateReportValDto;

  const caseTypeFound = await caseTypeRepository.findOne({
    where: {
      id: createReportValDto.val_cr_casetype_id_fk,
    },
  });

  if (!caseTypeFound) {
    throw new HttpException(
      `El tipo de caso no existe.`,
      HttpStatus.NOT_FOUND,
    );
  }

  switch (caseTypeFound.cas_t_name) {
    case caseTypeReport.RISK:
      dtoInstance = plainToInstance(CreateValRiskReportDto, createReportValDto);
      break;
    case caseTypeReport.ADVERSE_EVENT:
      dtoInstance = plainToInstance(
        CreateValAdverseEventReportDto,
        createReportValDto,
      );
      break;
    case caseTypeReport.INCIDENT:
      dtoInstance = plainToInstance(
        CreateValIncidentReportDto,
        createReportValDto,
      );
      break;
    case caseTypeReport.INDICATING_UNSAFE_CARE:
      dtoInstance = plainToInstance(
        CreateValIndicatingUnsafeCareReportDto,
        createReportValDto,
      );
      break;
    case caseTypeReport.COMPLICATIONS:
      dtoInstance = plainToInstance(
        CreateValComplicationsReportDto,
        createReportValDto,
      );
    default:
      throw new HttpException(
        'Tipo de caso no reconocido.',
        HttpStatus.BAD_REQUEST,
      );
  }

  const errors = await validate(dtoInstance);

  if (errors.length > 0) {
    throw new HttpException(
      `Validación fallida: ${errors.map((error) => error.toString()).join(', ')}`,
      HttpStatus.BAD_REQUEST,
    );
  }

  return dtoInstance;
}
