import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OncologyCategoryService } from '../services/oncology-category.service';
import { CreateOncologyCategoryDto } from '../dto/create-oncology-category.dto';
import { UpdateOncologyCategoryDto } from '../dto/update-oncology-category.dto';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('oncology-category')
@Controller('oncology-category')
@UseGuards(PermissionGuard)
export class OncologyCategoryController {
  constructor(
    private readonly oncologyCategoryService: OncologyCategoryService,
  ) {}

  @Post('/createOncologyCategory/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createOncologyCategory(
    @Body() createOncologyCategoryDto: CreateOncologyCategoryDto,
  ) {
    return this.oncologyCategoryService.createOncologyCategory(
      createOncologyCategoryDto,
    );
  }

  @Get('/listOncologyCategories/')
  listOncologyCategories() {
    return this.oncologyCategoryService.findAllOncologyCategories();
  }

  @Get('/findOncologyCategory/:id/')
  findOncologyCategory(@Param('id') id: number) {
    return this.oncologyCategoryService.findOneOncologyCategory(id);
  }

  @Patch('/updateOncologyCategory/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateOncologyCategory(
    @Param('id') id: number,
    @Body() updateOncologyCategoryDto: UpdateOncologyCategoryDto,
  ) {
    return this.oncologyCategoryService.updateoncologyCategory(
      id,
      updateOncologyCategoryDto,
    );
  }

  @Delete('/deleteOncologyCategory/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteOncologyCategory(@Param('id') id: number) {
    return this.oncologyCategoryService.deleteOncologyCategory(id);
  }
}
