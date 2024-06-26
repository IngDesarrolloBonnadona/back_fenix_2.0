import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateResearcherDto {
    @IsNotEmpty()
    @IsString()
    res_validatedcase_id_fk: string;
 
    @IsNotEmpty()
    @IsNumber()
    res_ra_userresearch_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    res_ra_days: number

    // @IsNotEmpty()
    // @IsNumber()
    // ass_ra_useranalyst_id: number;
}