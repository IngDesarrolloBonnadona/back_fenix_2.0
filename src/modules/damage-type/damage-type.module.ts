import { Module } from '@nestjs/common';
import { DamageTypeService } from './services/damage-type.service';
import { DamageTypeController } from './controllers/damage-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DamageType } from './entities/damage-type.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DamageType]), UserModule],
  controllers: [DamageTypeController],
  providers: [DamageTypeService],
  exports: [DamageTypeService],
})
export class DamageTypeModule {}
