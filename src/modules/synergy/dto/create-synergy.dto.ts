import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSynergyDto {
    @IsNotEmpty()
    @IsString()
    syn_validatedcase_id_fk: string;

    // @IsNotEmpty()
    // @IsNumber()
    // caseType_id: number;
}
