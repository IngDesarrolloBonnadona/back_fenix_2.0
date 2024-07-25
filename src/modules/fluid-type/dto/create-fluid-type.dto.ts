import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFluidTypeDto {
    @IsNotEmpty()
    @IsString()
    flu_t_name: string;

    @IsOptional()
    @IsString()
    flu_t_description: string;
}
