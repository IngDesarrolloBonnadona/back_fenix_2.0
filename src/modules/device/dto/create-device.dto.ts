import { IsNotEmpty, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";


export class CreateDeviceDto {
    @IsNumber()
    @IsNotEmpty()
    dev_case_id_fk: number

    @IsString()
    @IsNotEmpty()
    dev_name: string;

    @IsString()
    @IsNotEmpty()
    dev_code: string

    @IsOptional()
    @IsString()
    dev_description: string;
}
