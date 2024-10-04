import { Module } from '@nestjs/common';
import { CharacterizationCasesService } from './services/characterization-cases.service';
import { CharacterizationCasesController } from './controllers/characterization-cases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterizationCase } from './entities/characterization-case.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterizationCase]), UserModule],
  controllers: [CharacterizationCasesController],
  providers: [CharacterizationCasesService, PermissionGuard],
  exports: [CharacterizationCasesService],
})
export class CharacterizationCasesModule {}
