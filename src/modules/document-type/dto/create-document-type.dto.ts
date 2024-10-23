import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentTypeDto {
  @IsNotEmpty()
  @IsString()
  doc_t_code: string;

  @IsNotEmpty()
  @IsString()
  doc_t_name: string;
}
