import { IsNotEmpty, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateSubOriginDto {
    @IsNumber()
    @IsNotEmpty()
    sub_o_origin_id_FK: number

    @IsNotEmpty()
    @IsString()
    sub_o_name: string;

    @IsOptional()
    @IsString()
    sub_o_description: string;
}
