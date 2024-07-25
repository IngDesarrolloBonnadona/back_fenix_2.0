import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RiskFactorService } from '../services/risk-factor.service';
import { CreateRiskFactorDto } from '../dto/create-risk-factor.dto';
import { UpdateRiskFactorDto } from '../dto/update-risk-factor.dto';

@Controller('risk-factor')
export class RiskFactorController {
  constructor(private readonly riskFactorService: RiskFactorService) {}

  @Post()
  create(@Body() createRiskFactorDto: CreateRiskFactorDto) {
    return this.riskFactorService.createRiskFactor(createRiskFactorDto);
  }

  @Get()
  findAll() {
    return this.riskFactorService.findAllRiskFactors();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.riskFactorService.findOneRiskFactor(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRiskFactorDto: UpdateRiskFactorDto,
  ) {
    return this.riskFactorService.updateRiskFactor(id, updateRiskFactorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.riskFactorService.deleteRiskFactor(id);
  }
}
