import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUnsafeActionDto {
  @IsNotEmpty()
  @IsString()
  uns_a_name: string;

  @IsOptional()
  @IsString()
  uns_a_description: string;
}
