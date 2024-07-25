import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineDto } from './create-medicine.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {
    @IsOptional()
    @IsBoolean()
    med_status?: boolean
}
