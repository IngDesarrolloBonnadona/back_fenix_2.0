import { IsNotEmpty, IsNumber, IsString, isNumber } from "@nestjs/class-validator";

export class CreateMedicineDto {
    @IsString()
    @IsNotEmpty()
    med_name: string;

    @IsNumber()
    @IsNotEmpty()
    med_code: number
}
