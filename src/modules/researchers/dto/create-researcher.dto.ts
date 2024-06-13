import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateResearcherDto {
    @IsNotEmpty()
    @IsNumber()
    res_documentresearcher: number

    @IsNotEmpty()
    @IsString()
    res_nameresearcher: string;

    @IsNotEmpty()
    @IsString()
    res_lastnameresearcher: string;

    @IsNotEmpty()
    @IsString()
    res_validatedcase_id_fk: string;
}