import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CaseTypeService } from '../services/case-type.service';
import { CreateCaseTypeDto } from '../dto/create-case-type.dto';
import { UpdateCaseTypeDto } from '../dto/update-case-type.dto';
import { CaseType } from '../entities/case-type.entity';

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

  @Patch('/updateCaseType/:id')
  updateCaseType(@Param('id') id: number, @Body() updateCaseTypeDto: UpdateCaseTypeDto): Promise<CaseType> {
    return this.caseTypeService.updateCaseType(id, updateCaseTypeDto);
  }

  @Delete('/deleteCaseType/:id')
  async deleteCaseType(@Param('id') id: number): Promise<{ message: string }> {
    return await this.caseTypeService.deleteCaseType(id);

  }
}
