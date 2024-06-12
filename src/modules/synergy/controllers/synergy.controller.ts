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
} from '@nestjs/common';
import { SynergyService } from '../services/synergy.service';
import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('synergy')
@Controller('synergy')
export class SynergyController {
  constructor(private readonly synergyService: SynergyService) {}

  @Post('/createSynergy/:idValidator')
  createSynergy(
    @Body() createSynergyDto: CreateSynergyDto[],
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: number,
  ) {
    return this.synergyService.createSynergy(
      createSynergyDto,
      clientIp,
      idValidator,
    );
  }

  @Get('/listSynergies')
  listSynergies() {
    return this.synergyService.findAllSynergy();
  }

  @Get('/findSynergy/:id')
  findSynergy(@Param('id') id: number) {
    return this.synergyService.findOneSynergy(id);
  }

  @Put('/rescheduleSynergy/:id/:idValidator')
  rescheduleSynergy(
    @Param('id') id: number,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: number,
  ) {
    return this.synergyService.rescheduleSynergy(id, clientIp, idValidator);
  }

  @Post('/resolutionSynergy/:id/:idValidator')
  resolutionSynergy(
    @Param('id') id: number,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: number,
  ) {
    return this.synergyService.resolutionSynergy(id, clientIp, idValidator);
  }

  @Delete('/deleteSynergy/:id')
  deleteSynergy(@Param('id') id: number) {
    return this.synergyService.deleteSynergy(id);
  }
}
