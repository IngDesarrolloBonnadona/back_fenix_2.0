import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePositionDto {
    @IsNotEmpty()
    @IsString()
    pos_name: string

    @IsNotEmpty()
    @IsNumber()
    pos_code_k: number

    @IsNotEmpty()
    @IsNumber()
    pos_level: number
}
