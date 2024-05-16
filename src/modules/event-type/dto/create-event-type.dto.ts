import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateEventTypeDto {
    // eve_t_casetype_id_FK: number;
    @IsNotEmpty()
    @IsString()
    eve_t_name: string;
}
