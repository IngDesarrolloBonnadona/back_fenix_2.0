import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";


export class CreateDeviceDto {
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
