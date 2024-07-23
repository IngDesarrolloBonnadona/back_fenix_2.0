import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    serv_name: string;

    @IsNumber()
    @IsNotEmpty()
    serv_unit_id_fk: number;

    @IsOptional()
    @IsString()
    serv_description: string;
}
