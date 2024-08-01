import { Module } from '@nestjs/common';
import { ProtocolService } from './services/protocol.service';
import { ProtocolController } from './controllers/protocol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Protocol } from './entities/protocol.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Protocol]), UserModule],
  controllers: [ProtocolController],
  providers: [ProtocolService],
})
export class ProtocolModule {}
