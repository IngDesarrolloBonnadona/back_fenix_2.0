import { IsNotEmpty, IsNumber, IsOptional, IsString,  } from "@nestjs/class-validator";

export class CreateMovementReportDto {

    @IsNotEmpty()
    @IsString()
    mov_r_name: string;

    @IsOptional()
    @IsString()
    mov_r_description: string;

    @IsNumber()
    @IsNotEmpty()
    mov_r_time: number;
}
