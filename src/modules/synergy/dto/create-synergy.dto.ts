import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSynergyDto {
    @IsNotEmpty()
    @IsUUID()
    syn_validatedcase_id_fk: string;

    // @IsNotEmpty()
    // @IsNumber()
    // caseType_id: number;
}
