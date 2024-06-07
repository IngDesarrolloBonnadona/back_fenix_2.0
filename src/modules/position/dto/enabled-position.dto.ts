import { IsBoolean, IsNotEmpty } from "class-validator";

export class EnabledPositionDto {
    @IsNotEmpty()
    @IsBoolean()
    pos_enabled: boolean
}