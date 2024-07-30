import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateClinicalResearchInfluencingFactorDto {
    // @IsNotEmpty()
    // @IsNumber()
    // inf_fcr_clinicalresearch_id_fk: number;

    @IsNotEmpty()
    @IsNumber()
    inf_fcr_influencingfactor_id_fk: number;
}
