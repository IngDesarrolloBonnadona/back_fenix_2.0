import { IsString } from "class-validator";

export class FilterResearcherDto {
    @IsString()
    empImmediateBoss: string;
  
    @IsString()
    empPosition: string;
  
    // @IsNumber()
    // empStatus: number;
}
