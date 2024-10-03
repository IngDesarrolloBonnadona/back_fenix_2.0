import { PartialType } from '@nestjs/swagger';
import { CreateOncologyCategoryDto } from './create-oncology-category.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateOncologyCategoryDto extends PartialType(CreateOncologyCategoryDto) {
    @IsOptional()
    @IsBoolean()
    onc_c_status?: boolean
}
