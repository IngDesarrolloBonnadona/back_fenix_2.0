import { PartialType } from '@nestjs/mapped-types';
import { CreateSubOriginDto } from './create-sub-origin.dto';

export class UpdateSubOriginDto extends PartialType(CreateSubOriginDto) {}
