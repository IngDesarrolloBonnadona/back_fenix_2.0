import { IsNotEmpty, IsString } from "class-validator";

export class CreatePositionDto {
    @IsNotEmpty()
    @IsString()
    pos_name: string

    @IsNotEmpty()
    @IsString()
    pos_code_k: number

    @IsNotEmpty()
    @IsString()
    pos_level: number
}
