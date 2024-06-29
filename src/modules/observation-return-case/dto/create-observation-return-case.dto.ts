import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateObservationReturnCaseDto {
    @IsNotEmpty()
    @IsNumber()
    rec_o_reasonreturn_id_fk: number;

    @IsNotEmpty()
    @IsString()
    rec_o_observation: string;
}
