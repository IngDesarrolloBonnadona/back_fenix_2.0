import { IsBoolean, IsNotEmpty,  } from 'class-validator';

export class UpdateStatusPriorityDto {
  @IsBoolean()
  @IsNotEmpty()
  prior_status: boolean;
}
