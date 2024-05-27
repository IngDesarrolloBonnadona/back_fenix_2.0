import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";

export class CreateEventDto {

    @IsNotEmpty()
    eve_eventtype_id_FK: number;

    @IsNotEmpty()
    @IsString()
    eve_name: string;

    @IsOptional()
    @IsString()
    eve_description: string;
}
