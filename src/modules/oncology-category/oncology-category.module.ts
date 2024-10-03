import { Module } from '@nestjs/common';
import { OncologyCategoryService } from './services/oncology-category.service';
import { OncologyCategoryController } from './controllers/oncology-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OncologyCategory } from './entities/oncology-category.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([OncologyCategory]), UserModule],
  controllers: [OncologyCategoryController],
  providers: [OncologyCategoryService],
  exports: [OncologyCategoryService],
})
export class OncologyCategoryModule {}
