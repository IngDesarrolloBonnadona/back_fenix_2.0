import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCharacterizationCaseDto {
    @IsNotEmpty()
    @IsString()
    cha_c_name: string;

    @IsOptional()
    @IsString()
    cha_c_description: string;
}
