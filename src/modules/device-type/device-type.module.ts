import { Module } from '@nestjs/common';
import { DeviceTypeService } from './services/device-type.service';
import { DeviceTypeController } from './controllers/device-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceType } from './entities/device-type.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceType]), UserModule],
  controllers: [DeviceTypeController],
  providers: [DeviceTypeService],
  exports: [DeviceTypeService],
})
export class DeviceTypeModule {}
