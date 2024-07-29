import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Ip,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { SynergyService } from '../services/synergy.service';
import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { ApiTags } from '@nestjs/swagger';
import { Synergy } from '../entities/synergy.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('synergy')
@Controller('synergy')
@UseGuards(PermissionGuard)
export class SynergyController {
  constructor(private readonly synergyService: SynergyService) {}

  @Post('/createSynergy/:idValidator/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  createSynergy(
    @Body() createSynergyDto: CreateSynergyDto[],
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
  ): Promise<
    | HttpException
    | {
        message: string;
        invalidSynergyCodes: string[];
      }
  > {
    return this.synergyService.createSynergy(
      createSynergyDto,
      clientIp,
      idValidator,
    );
  }

  @Get('/listSynergies/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  listSynergies(): Promise<Synergy[]> {
    return this.synergyService.findAllSynergy();
  }

  @Get('/findSynergy/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  findSynergy(@Param('id') id: number): Promise<Synergy> {
    return this.synergyService.findOneSynergy(id);
  }

  @Patch('/rescheduleSynergy/:id/:idValidator/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  rescheduleSynergy(
    @Param('id') id: number,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
  ): Promise<HttpException> {
    return this.synergyService.rescheduleSynergy(id, clientIp, idValidator);
  }

  @Post('/resolutionSynergy/:id/:idValidator/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  resolutionSynergy(
    @Param('id') id: number,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
  ): Promise<HttpException> {
    return this.synergyService.resolutionSynergy(id, clientIp, idValidator);
  }

  @Delete('/deleteSynergy/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  deleteSynergy(@Param('id') id: number): Promise<HttpException> {
    return this.synergyService.deleteSynergy(id);
  }
}
