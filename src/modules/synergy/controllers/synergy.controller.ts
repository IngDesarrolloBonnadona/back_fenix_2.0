import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SynergyService } from '../services/synergy.service';
import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { UpdateSynergyDto } from '../dto/update-synergy.dto';

@Controller('synergy')
export class SynergyController {
  constructor(private readonly synergyService: SynergyService) {}

  @Post()
  create(@Body() createSynergyDto: CreateSynergyDto) {
    return this.synergyService.createSynergy(createSynergyDto);
  }

  @Get()
  findAll() {
    return this.synergyService.findAllSynergy();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.synergyService.findOneSynergy(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSynergyDto: UpdateSynergyDto) {
    return this.synergyService.updateSynergy(id, updateSynergyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.synergyService.deleteSynergy(id);
  }
}