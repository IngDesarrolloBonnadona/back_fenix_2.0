import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateActionPlanCaseReportValidateDto {
    @IsString()
    @IsNotEmpty()
    plan_av_validatedcase_id_fk: string;

    @IsNumber()
    @IsNotEmpty()
    plan_av_actionplan_id_fk: number;
}
