import { PartialType } from '@nestjs/swagger';
import { CreateDocumentTypeDto } from './create-document-type.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateDocumentTypeDto extends PartialType(CreateDocumentTypeDto) {
    @IsOptional()
    @IsBoolean()
    doc_t_status?: boolean
}
