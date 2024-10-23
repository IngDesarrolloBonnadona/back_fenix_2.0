import { Module } from '@nestjs/common';
import { DocumentTypeService } from './services/document-type.service';
import { DocumentTypeController } from './controllers/document-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentType } from './entities/document-type.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentType]), UserModule],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
