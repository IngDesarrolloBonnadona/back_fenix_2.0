import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateResearchInstrumentDto {
    @IsNotEmpty()
    @IsString()
    inst_r_name: string;

    @IsOptional()
    @IsString()
    inst_r_description: string;
}
