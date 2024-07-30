import { Module } from '@nestjs/common';
import { FluidTypeService } from './services/fluid-type.service';
import { FluidTypeController } from './controllers/fluid-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FluidType } from './entities/fluid-type.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FluidType]), UserModule],
  controllers: [FluidTypeController],
  providers: [FluidTypeService],
  exports: [FluidTypeService],
})
export class FluidTypeModule {}
