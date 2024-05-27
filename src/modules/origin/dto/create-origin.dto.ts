import { IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateOriginDto {

    @IsNotEmpty()
    @IsString()
    orig_name: string;

    @IsOptional()
    @IsString()
    orig_description: string;
}
