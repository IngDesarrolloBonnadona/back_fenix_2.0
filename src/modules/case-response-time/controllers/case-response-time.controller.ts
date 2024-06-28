import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CaseResponseTimeService } from '../services/case-response-time.service';
import { CreateCaseResponseTimeDto } from '../dto/create-case-response-time.dto';
import { UpdateCaseResponseTimeDto } from '../dto/update-case-response-time.dto';

@Controller('case-response-time')
export class CaseResponseTimeController {
  constructor(
    private readonly caseResponseTimeService: CaseResponseTimeService,
  ) {}

  @Post()
  create(@Body() createCaseResponseTimeDto: CreateCaseResponseTimeDto) {
    return this.caseResponseTimeService.create(createCaseResponseTimeDto);
  }

  @Get()
  findAll() {
    return this.caseResponseTimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caseResponseTimeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCaseResponseTimeDto: UpdateCaseResponseTimeDto,
  ) {
    return this.caseResponseTimeService.update(+id, updateCaseResponseTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseResponseTimeService.remove(+id);
  }
}
