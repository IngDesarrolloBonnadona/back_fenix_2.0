import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDamageTypeDto {
    @IsNotEmpty()
    @IsString()
    dam_t_name: string;

    @IsOptional()
    @IsString()
    dam_t_description: string;
}
