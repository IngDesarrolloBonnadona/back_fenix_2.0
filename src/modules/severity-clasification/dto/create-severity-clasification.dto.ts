import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSeverityClasificationDto {
    @IsNotEmpty()
    @IsString()
    sev_c_name: string;

    @IsOptional()
    @IsString()
    sev_c_description: string;
}
