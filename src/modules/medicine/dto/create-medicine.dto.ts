import { IsNotEmpty, IsNumber, IsString, isNumber } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";

export class CreateMedicineDto {

    // @IsNumber()
    @IsNotEmpty()
    med_case_id_fk: number

    @IsString()
    @IsNotEmpty()
    med_name: string;

    @IsNumber()
    @IsNotEmpty()
    med_code: number

    @IsOptional()
    @IsString()
    med_description: string;
}
