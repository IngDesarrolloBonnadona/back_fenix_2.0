import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReasonReturnCaseDto {
  @IsNotEmpty()
  @IsString()
  rec_r_actor: string;

  @IsNotEmpty()
  @IsString()
  rec_r_cause: string;
}
