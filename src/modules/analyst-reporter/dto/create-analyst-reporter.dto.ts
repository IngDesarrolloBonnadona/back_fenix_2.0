import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAnalystReporterDto {
    @IsNotEmpty()
    @IsString()
    ana_r_validatedcase_id_fk: string;

    @IsNotEmpty()
    @IsNumber()
    ana_r_position_id_fk: number;

    @IsNotEmpty()
    @IsNumber()
    ana_r_user_id_fk: number;
}
