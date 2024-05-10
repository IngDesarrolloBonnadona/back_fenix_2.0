import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateMedicineDto {
    @IsString()
    @IsNotEmpty()
    med_name: string;
}
