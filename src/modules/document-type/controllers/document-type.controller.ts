import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DocumentTypeService } from '../services/document-type.service';
import { CreateDocumentTypeDto } from '../dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from '../dto/update-document-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('document-type')
@Controller('document-type')
@UseGuards(PermissionGuard)
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post('/createDocumentType/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createDocumentType(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    return this.documentTypeService.createDocumentType(createDocumentTypeDto);
  }

  @Get('/listDocumentTypes/')
  listDocumentTypes() {
    return this.documentTypeService.findAllDocumentType();
  }

  @Get('/findDocumentType/:id')
  findDocumentType(@Param('id') id: number) {
    return this.documentTypeService.findOneDocumentType(id);
  }

  @Patch('/updateDocumentType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateDocumentType(
    @Param('id') id: number,
    @Body() updateDocumentTypeDto: UpdateDocumentTypeDto,
  ) {
    return this.documentTypeService.updateDocumentType(
      id,
      updateDocumentTypeDto,
    );
  }

  @Delete('/deleteDocumentType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteDocumentType(@Param('id') id: number) {
    return this.documentTypeService.deleteDocumentType(id);
  }
}
