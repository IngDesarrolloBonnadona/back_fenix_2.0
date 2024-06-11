import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SynergyService } from '../services/synergy.service';
import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { UpdateSynergyDto } from '../dto/update-synergy.dto';

@Controller('synergy')
export class SynergyController {
  constructor(private readonly synergyService: SynergyService) {}

  @Post('/createSynergy')
  create(@Body() createSynergyDto: CreateSynergyDto) {
    return this.synergyService.createSynergy(createSynergyDto);
  }

  @Get('/listSynergies')
  listSynergies() {
    return this.synergyService.findAllSynergy();
  }

  @Get('/findSynergy/:id')
  findSynergy(@Param('id') id: number) {
    return this.synergyService.findOneSynergy(id);
  }

  @Put('/updateSynergy/:id')
  updateSynergy(@Param('id') id: number, @Body() updateSynergyDto: UpdateSynergyDto) {
    return this.synergyService.updateSynergy(id, updateSynergyDto);
  }

  @Delete('/deleteSynergy/:id')
  deleteSynergy(@Param('id') id: number) {
    return this.synergyService.deleteSynergy(id);
  }
}
