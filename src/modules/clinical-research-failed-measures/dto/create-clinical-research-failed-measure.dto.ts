import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateClinicalResearchFailedMeasureDto {
    @IsNotEmpty()
    @IsNumber()
    meas_fcr_clinicalresearch_id_fk: number;

    @IsNotEmpty()
    @IsNumber()
    meas_fcr_failedmeasures_id_fk: number;
}
