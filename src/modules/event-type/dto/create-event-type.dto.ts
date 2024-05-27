import { IsNotEmpty, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateEventTypeDto {
    @IsNumber()
    @IsNotEmpty()
    eve_t_casetype_id_FK: number;

    @IsNotEmpty()
    @IsString()
    eve_t_name: string;

    @IsOptional()
    @IsString()
    eve_t_description: string
}
