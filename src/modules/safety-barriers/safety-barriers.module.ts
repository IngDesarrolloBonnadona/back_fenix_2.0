import { Module } from '@nestjs/common';
import { SafetyBarriersService } from './services/safety-barriers.service';
import { SafetyBarriersController } from './controllers/safety-barriers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafetyBarrier } from './entities/safety-barrier.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SafetyBarrier]), UserModule],
  controllers: [SafetyBarriersController],
  providers: [SafetyBarriersService],
  exports: [SafetyBarriersService],
})
export class SafetyBarriersModule {}
