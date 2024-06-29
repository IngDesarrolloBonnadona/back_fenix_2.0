import { PartialType } from '@nestjs/swagger';
import { CreateObservationReturnCaseDto } from './create-observation-return-case.dto';

export class UpdateObservationReturnCaseDto extends PartialType(CreateObservationReturnCaseDto) {}
