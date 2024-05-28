import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRiskTypeDto {
    @IsNotEmpty()
    @IsString()
    ris_t_name: string;

    @IsOptional()
    @IsString()
    ris_t_description: string;
}
