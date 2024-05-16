import { IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateRiskLevelDto {

    @IsNotEmpty()
    @IsString()
    ris_l_name: string;

    @IsOptional()
    @IsString()
    ris_l_description: string;
}
