import { IsNotEmpty, IsString, IsOptional, IsUUID } from "class-validator";

export class CreateMedicineDto {
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
