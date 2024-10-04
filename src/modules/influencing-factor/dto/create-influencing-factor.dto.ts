import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateInfluencingFactorDto {
    @IsNotEmpty()
    @IsString()
    inf_f_name: string;

    @IsOptional()
    @IsString()
    inf_f_description: string;
}
