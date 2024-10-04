import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRiskFactorDto {
    @IsNotEmpty()
    @IsString()
    ris_f_name: string;

    @IsOptional()
    @IsString()
    ris_f_description: string;
}
