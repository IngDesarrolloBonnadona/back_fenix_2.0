import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { InfluencingFactorService } from '../services/influencing-factor.service';
import { CreateInfluencingFactorDto } from '../dto/create-influencing-factor.dto';
import { UpdateInfluencingFactorDto } from '../dto/update-influencing-factor.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';
import { InfluencingFactor } from '../entities/influencing-factor.entity';

@ApiTags('influencing-factor')
@Controller('influencing-factor')
@UseGuards(PermissionGuard)
export class InfluencingFactorController {
  constructor(
    private readonly influencingFactorService: InfluencingFactorService,
  ) {}

  @Post('/createInfluencingFactor/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createInfluencingFactor(
    @Body() createInfluencingFactorDto: CreateInfluencingFactorDto,
  ) {
    return this.influencingFactorService.createInfluencingFactor(
      createInfluencingFactorDto,
    );
  }

  @Get('/listInfluencingFactors/')
  listInfluencingFactors() {
    return this.influencingFactorService.findAllInfluencingFactors();
  }

  @Get('/findInfluencingFactor/:id')
  findInfluencingFactor(
    @Param('id') id: number,
  ) {
    return this.influencingFactorService.findOneInfluencingFactor(id);
  }

  @Patch('/updateInfluencingFactor/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateInfluencingFactor(
    @Param('id') id: number,
    @Body() updateInfluencingFactorDto: UpdateInfluencingFactorDto,
  ) {
    return this.influencingFactorService.updateInfluencingFactor(
      id,
      updateInfluencingFactorDto,
    );
  }

  @Delete('/deleteInfluencingFactor/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteInfluencingFactor(@Param('id') id: number) {
    return this.influencingFactorService.deleteInfluencingFactor(id);
  }
}
