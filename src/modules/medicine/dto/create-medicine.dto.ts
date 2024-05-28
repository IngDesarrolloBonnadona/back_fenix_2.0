import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";

export class CreateMedicineDto {

    @IsNumber()
    @IsNotEmpty()
    med_case_id_fk: string

    @IsString()
    @IsNotEmpty()
    med_name: string;

    @IsString()
    @IsNotEmpty()
    med_code: string

    @IsOptional()
    @IsString()
    med_description: string;
}
