import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCaseTypeDto {
    @IsNotEmpty()
    @IsString()
    cas_t_name: string;

    @IsOptional()
    @IsString()
    cas_t_description: string;
}
