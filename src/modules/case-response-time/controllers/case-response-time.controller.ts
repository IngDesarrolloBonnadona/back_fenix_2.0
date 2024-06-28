import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { CaseResponseTimeService } from '../services/case-response-time.service';
import { CreateCaseResponseTimeDto } from '../dto/create-case-response-time.dto';
import { UpdateCaseResponseTimeDto } from '../dto/update-case-response-time.dto';
import { ApiTags } from '@nestjs/swagger';
import { CaseResponseTime } from '../entities/case-response-time.entity';

@ApiTags('case-response-time')
@Controller('case-response-time')
export class CaseResponseTimeController {
  constructor(
    private readonly caseResponseTimeService: CaseResponseTimeService,
  ) {}

  @Post('/createCaseResponseTime')
  createCaseResponseTime(
    @Body() createCaseResponseTimeDto: CreateCaseResponseTimeDto,
  ): Promise<CaseResponseTime> {
    return this.caseResponseTimeService.createCaseResponseTime(
      createCaseResponseTimeDto,
    );
  }

  @Get('/listCaseResponseTimes')
  listCaseResponseTimes(): Promise<CaseResponseTime[]> {
    return this.caseResponseTimeService.findAllCaseResponseTimes();
  }

  @Get('/findCaseResponseTime/:id')
  findCaseResponseTime(@Param('id') id: number): Promise<CaseResponseTime> {
    return this.caseResponseTimeService.findOnefindAllCaseResponseTime(id);
  }

  @Patch('/updateCreateCaseResponseTime/:id')
  updateCreateCaseResponseTime(
    @Param('id') id: number,
    @Body() updateCaseResponseTimeDto: UpdateCaseResponseTimeDto,
  ): Promise<HttpException> {
    return this.caseResponseTimeService.updateCaseResponseTime(
      id,
      updateCaseResponseTimeDto,
    );
  }

  @Delete('/deleteCreateCaseResponseTime/:id')
  deleteCreateCaseResponseTime(
    @Param('id') id: number,
  ): Promise<HttpException> {
    return this.caseResponseTimeService.deleteCaseResponseTime(id);
  }
}
