import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStatusReportDto {
    @IsNumber()
    @IsNotEmpty()
    sta_r_originalcase_id_fk: string;

    @IsNumber()
    @IsNotEmpty()
    sta_r_movement_id_fk: number;

    @IsString()
    @IsOptional()
    sta_r_description: string;

    @IsString()
    @IsOptional()
    sta_r_name: string;
}
