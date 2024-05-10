import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RiskTypeService } from '../services/risk-type.service';
import { CreateRiskTypeDto } from '../dto/create-risk-type.dto';
import { UpdateRiskTypeDto } from '../dto/update-risk-type.dto';

@Controller('risk-type')
export class RiskTypeController {
  constructor(private readonly riskTypeService: RiskTypeService) {}

  @Post()
  create(@Body() createRiskTypeDto: CreateRiskTypeDto) {
    return this.riskTypeService.create(createRiskTypeDto);
  }

  @Get()
  findAll() {
    return this.riskTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskTypeDto: UpdateRiskTypeDto) {
    return this.riskTypeService.update(+id, updateRiskTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskTypeService.remove(+id);
  }
}
