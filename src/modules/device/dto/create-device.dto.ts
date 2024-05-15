import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";


export class CreateDeviceDto {
    @IsString()
    @IsNotEmpty()
    dev_name: string;

    @IsNumber()
    @IsNotEmpty()
    dev_code: number
}
