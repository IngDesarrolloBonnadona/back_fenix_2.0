import { Module } from '@nestjs/common';
import { CaseTypeService } from './services/case-type.service';
import { CaseTypeController } from './controllers/case-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseType } from './entities/case-type.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CaseType]), UserModule],
  controllers: [CaseTypeController],
  providers: [CaseTypeService, PermissionGuard],
  exports: [CaseTypeService],
})
export class CaseTypeModule {}
