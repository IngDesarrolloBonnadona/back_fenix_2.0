import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProtocolDto {
  @IsNotEmpty()
  @IsString()
  prot_name: string;

  @IsOptional()
  @IsString()
  prot_description: string;
}
