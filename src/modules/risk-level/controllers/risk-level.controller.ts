import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { RiskLevelService } from '../services/risk-level.service';
import { CreateRiskLevelDto } from '../dto/create-risk-level.dto';
import { UpdateRiskLevelDto } from '../dto/update-risk-level.dto';
import { RiskLevel } from '../entities/risk-level.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('risk-level')
@Controller('risk-level')
export class RiskLevelController {
  constructor(private readonly riskLevelService: RiskLevelService) {}

  @Post('/createRiskLevel')
  createRiskLevel(@Body() createRiskLevelDto: CreateRiskLevelDto): Promise<RiskLevel> {
    return this.riskLevelService.createRiskLevel(createRiskLevelDto);
  }

  @Get('/listRisksLevel')
  listRiskLevel(): Promise<RiskLevel[]> {
    return this.riskLevelService.findAllRiskLevel();
  }

  @Get('/findRiskLevel/:id')
  findRiskLevel(@Param('id') id: number): Promise<RiskLevel> {
    return this.riskLevelService.findOneRiskLevel(id);
  }

  @Put('/updateRiskLevel/:id')
  updateRiskLevel(@Param('id') id: number, @Body() updateRiskLevelDto: UpdateRiskLevelDto): Promise<HttpException> {
    return this.riskLevelService.updateRiskLevel(id, updateRiskLevelDto);
  }

  @Delete('/deleteRiskLevel/:id')
  async deleteRiskLevel(@Param('id') id: number): Promise<HttpException> {
    return await this.riskLevelService.deleteRiskLevel(id);
  }
}
