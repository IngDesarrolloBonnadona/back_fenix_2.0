import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/bonnadonaUsers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users], 'bonnadonaHub')],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
