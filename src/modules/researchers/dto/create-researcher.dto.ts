import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateResearcherDto {
    @IsNotEmpty()
    @IsString()
    res_documentresearcher: string

    @IsNotEmpty()
    @IsString()
    res_nameresearcher: string;

    @IsNotEmpty()
    @IsString()
    res_lastnameresearcher: string;

    @IsNotEmpty()
    @IsString()
    res_validatedcase_id_fk: string;

    @IsNotEmpty()
    @IsNumber()
    res_analyst_id_fk: number;
}