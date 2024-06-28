import { PartialType } from '@nestjs/swagger';
import { CreateReasonReturnCaseDto } from './create-reason-return-case.dto';

export class UpdateReasonReturnCaseDto extends PartialType(CreateReasonReturnCaseDto) {}
