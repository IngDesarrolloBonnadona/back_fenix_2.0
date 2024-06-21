import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put } from '@nestjs/common';
import { CaseTypeService } from '../services/case-type.service';
import { CreateCaseTypeDto } from '../dto/create-case-type.dto';
import { UpdateCaseTypeDto } from '../dto/update-case-type.dto';
import { CaseType } from '../entities/case-type.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('case-type')
@Controller('case-type')
export class CaseTypeController {
  constructor(private readonly caseTypeService: CaseTypeService) {}

  @Post('/createCaseType')
  createCaseType(@Body() createCaseTypeDto: CreateCaseTypeDto): Promise<CaseType> {
    return this.caseTypeService.createCaseType(createCaseTypeDto);
  }

  @Get('/listCaseTypes')
  listCaseTypes(): Promise<CaseType[]> {
    return this.caseTypeService.findAllCaseTypes();
  }

  @Get('/findCaseType/:id')
  findCaseType(@Param('id') id: number): Promise<CaseType> {
    return this.caseTypeService.findOneCaseType(id);
  }

  @Put('/updateCaseType/:id')
  async updateCaseType(@Param('id') id: number, @Body() updateCaseTypeDto: UpdateCaseTypeDto): Promise<HttpException> {
    return await this.caseTypeService.updateCaseType(id, updateCaseTypeDto);
  }

  @Delete('/deleteCaseType/:id')
  async deleteCaseType(@Param('id') id: number): Promise<HttpException> {
    return await this.caseTypeService.deleteCaseType(id);

  }
}
