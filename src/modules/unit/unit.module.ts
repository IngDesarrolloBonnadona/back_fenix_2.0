import { Module } from '@nestjs/common';
import { UnitService } from './services/unit.service';
import { UnitController } from './controllers/unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
// import { ServiceModule } from '../service/service.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Unit]), UserModule],
  controllers: [UnitController],
  providers: [UnitService, PermissionGuard],
  exports: [UnitService],
})
export class UnitModule {}
