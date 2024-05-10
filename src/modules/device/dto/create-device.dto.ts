import { IsNotEmpty, IsString } from "@nestjs/class-validator";


export class CreateDeviceDto {
    @IsString()
    @IsNotEmpty()
    dev_name: string;
}
