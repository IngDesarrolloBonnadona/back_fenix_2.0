import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RiskLevelService } from './risk-level.service';
import { CreateRiskLevelDto } from './dto/create-risk-level.dto';
import { UpdateRiskLevelDto } from './dto/update-risk-level.dto';

@Controller('risk-level')
export class RiskLevelController {
  constructor(private readonly riskLevelService: RiskLevelService) {}

  @Post()
  create(@Body() createRiskLevelDto: CreateRiskLevelDto) {
    return this.riskLevelService.create(createRiskLevelDto);
  }

  @Get()
  findAll() {
    return this.riskLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskLevelDto: UpdateRiskLevelDto) {
    return this.riskLevelService.update(+id, updateRiskLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskLevelService.remove(+id);
  }
}
