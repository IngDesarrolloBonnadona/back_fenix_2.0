import { IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateSubOriginDto {
    @IsNotEmpty()
    @IsString()
    sub_o_name: string;

    @IsOptional()
    @IsString()
    sub_o_description: string;
}
