import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSynergyDto {
    @IsNotEmpty()
    @IsUUID()
    syn_validatedcase_id_fk: string;

    // @IsNotEmpty()
    // @IsString()
    // syn_patient_id: String;

    // @IsNotEmpty()
    // @IsString()
    // syn_patientname: String;

    // @IsNotEmpty()
    // @IsNumber()
    // syn_patientage: number;

    // @IsNotEmpty()
    // @IsString()
    // syn_patientmedicalhistory: String;

    // @IsNotEmpty()
    // @IsString()
    // syn_patientcomorbidity: String;

    // @IsNotEmpty()
    // @IsString()
    // syn_preliminaryCauses: String;

    // @IsNotEmpty()
    // @IsString()
    // syn_patientImpact: String;

    // @IsNotEmpty()
    // @IsString()
    // syn_currentTreatmentAndFamilyStatus: String; 

    // @IsNotEmpty()
    // @IsBoolean()
    // syn_clinicalStaffNotified: boolean;
}
