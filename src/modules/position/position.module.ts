import { Module } from '@nestjs/common';
import { PositionService } from './services/position.service';
import { PositionController } from '../position/controllers/position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { HttpModule } from '@nestjs/axios';
import { HttpPositionService } from './http/http-position.service';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), HttpModule, UserModule],
  controllers: [PositionController],
  providers: [PositionService, HttpPositionService, PermissionGuard],
  exports: [PositionService],
})
export class PositionModule {}
