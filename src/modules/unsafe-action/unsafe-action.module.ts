import { Module } from '@nestjs/common';
import { UnsafeActionService } from './services/unsafe-action.service';
import { UnsafeActionController } from './controllers/unsafe-action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnsafeAction } from './entities/unsafe-action.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UnsafeAction]), UserModule],
  controllers: [UnsafeActionController],
  providers: [UnsafeActionService],
})
export class UnsafeActionModule {}
