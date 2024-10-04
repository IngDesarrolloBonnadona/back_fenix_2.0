import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSafetyBarrierDto {
    @IsNotEmpty()
    @IsString()
    saf_b_name: string;

    @IsOptional()
    @IsString()
    saf_b_description: string;
}
