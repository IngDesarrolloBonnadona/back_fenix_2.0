import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    serv_name: string;

    @IsOptional()
    @IsString()
    serv_description: string;
}
