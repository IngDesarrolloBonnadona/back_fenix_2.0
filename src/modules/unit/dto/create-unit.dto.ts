import { IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateUnitDto {
    // unit_service_id_FK: number
    @IsNotEmpty()
    @IsString()
    unit_name: string;

    @IsOptional()
    @IsString()
    unit_description: string;
}
