import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/bonnadonaUsers.entity';
import { UserDetails } from './entities/bonnadonaDetails.entity';
import { Modules } from './entities/bonnadonaModules.entity';
import { Position } from './entities/bonnadonaPosition.entity';
import { Roles } from './entities/bonnadonaRoles.entity';
import { RolesPermissions } from './entities/bonnadonaRolesPermissions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      // UserDetails,
      // Modules,
      // Position,
      // Roles,
      // RolesPermissions,
    ], 'bonnadonaHub'),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
