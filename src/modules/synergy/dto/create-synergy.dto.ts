import { IsNotEmpty, IsString } from "class-validator";

export class CreateSynergyDto {
    @IsNotEmpty()
    @IsString()
    syn_validatedcase_id_fk: string;
}
