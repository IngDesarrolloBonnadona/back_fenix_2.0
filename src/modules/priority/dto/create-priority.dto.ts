import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePriorityDto {
  @IsString()
  @IsNotEmpty()
  prior_name: string;
}
