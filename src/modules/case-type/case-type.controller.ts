import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaseTypeService } from './case-type.service';
import { CreateCaseTypeDto } from './dto/create-case-type.dto';
import { UpdateCaseTypeDto } from './dto/update-case-type.dto';

@Controller('case-type')
export class CaseTypeController {
  constructor(private readonly caseTypeService: CaseTypeService) {}

  @Post()
  create(@Body() createCaseTypeDto: CreateCaseTypeDto) {
    return this.caseTypeService.create(createCaseTypeDto);
  }

  @Get()
  findAll() {
    return this.caseTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caseTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseTypeDto: UpdateCaseTypeDto) {
    return this.caseTypeService.update(+id, updateCaseTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseTypeService.remove(+id);
  }
}
