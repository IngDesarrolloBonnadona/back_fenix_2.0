import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOncologyCategoryDto {
    @IsNotEmpty()
    @IsString()
    onc_c_name: string;

    @IsOptional()
    @IsString()
    onc_c_description: string;
}
