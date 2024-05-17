import { IsNotEmpty, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";


export class CreateDeviceDto {
    // @IsNumber()
    @IsNotEmpty()
    dev_case_id_fk: number

    @IsString()
    @IsNotEmpty()
    dev_name: string;

    // @IsNumber()
    @IsNotEmpty()
    dev_code: number

    @IsOptional()
    @IsNotEmpty()
    dev_description: string;
}
