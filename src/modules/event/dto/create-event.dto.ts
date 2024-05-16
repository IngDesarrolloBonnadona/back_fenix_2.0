import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateEventDto {
    // eve_eventtype_id_FK: number;

    @IsNotEmpty()
    @IsString()
    eve_name: string;

}
