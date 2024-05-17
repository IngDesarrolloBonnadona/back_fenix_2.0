import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RiskTypeService } from '../services/risk-type.service';
import { CreateRiskTypeDto } from '../dto/create-risk-type.dto';
import { UpdateRiskTypeDto } from '../dto/update-risk-type.dto';
import { RiskType } from '../entities/risk-type.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('risk-type')
@Controller('risk-type')
export class RiskTypeController {
  constructor(private readonly riskTypeService: RiskTypeService) {}

  @Post('/createRisktype')
  createRisktype(@Body() createRiskTypeDto: CreateRiskTypeDto): Promise<RiskType> {
    return this.riskTypeService.createRiskType(createRiskTypeDto);
  }

  @Get('/listRisktypes')
  listRisktypes(): Promise<RiskType[]> {
    return this.riskTypeService.findAllRiskTypes();
  }

  @Get('/findRisktype/:id')
  findRisktype(@Param('id') id: number): Promise<RiskType> {
    return this.riskTypeService.findOneRiskType(id);
  }

  @Patch('/updateRisktype/:id')
  updateRisktype(@Param('id') id: number, @Body() updateRiskTypeDto: UpdateRiskTypeDto): Promise<RiskType> {
    return this.riskTypeService.updateRiskType(id, updateRiskTypeDto);
  }

  @Delete('/deleteRisktype/:id')
  async deleteRisktype(@Param('id') id: number): Promise<{ message: string }> {
    return await this.riskTypeService.deleteRiskType(id);
  }
}
