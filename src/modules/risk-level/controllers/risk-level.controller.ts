import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RiskLevelService } from '../services/risk-level.service';
import { CreateRiskLevelDto } from '../dto/create-risk-level.dto';
import { UpdateRiskLevelDto } from '../dto/update-risk-level.dto';
import { RiskLevel } from '../entities/risk-level.entity';

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

  @Patch('/updateRiskLevel/:id')
  updateRiskLevel(@Param('id') id: number, @Body() updateRiskLevelDto: UpdateRiskLevelDto): Promise<RiskLevel> {
    return this.riskLevelService.updateRiskLevel(id, updateRiskLevelDto);
  }

  @Delete('/deleteRiskLevel/:id')
  async deleteRiskLevel(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.riskLevelService.deleteRiskLevel(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}