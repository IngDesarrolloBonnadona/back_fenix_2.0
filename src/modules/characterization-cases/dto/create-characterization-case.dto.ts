import { IsNotEmpty, IsString } from "class-validator";

export class CreateCharacterizationCaseDto {
    @IsNotEmpty()
    @IsString()
    cha_c_name: string;

    @IsNotEmpty()
    @IsString()
    cha_c_description: string;
}
