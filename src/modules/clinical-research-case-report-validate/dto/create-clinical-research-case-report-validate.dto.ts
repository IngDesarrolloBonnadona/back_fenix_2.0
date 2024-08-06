import { IsNotEmpty, IsString } from "class-validator";

export class CreateClinicalResearchCaseReportValidateDto {
    @IsString()
    @IsNotEmpty()
    res_crv_validatedcase_id_fk: string;
}
