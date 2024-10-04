import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFailedMeasureDto {
    @IsNotEmpty()
    @IsString()
    meas_f_name: string;

    @IsOptional()
    @IsString()
    meas_f_description: string;
}
