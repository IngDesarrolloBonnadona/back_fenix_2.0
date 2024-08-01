import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDeviceTypeDto {
    @IsNotEmpty()
    @IsString()
    dev_t_name: string;

    @IsOptional()
    @IsString()
    dev_t_description: string;
}
