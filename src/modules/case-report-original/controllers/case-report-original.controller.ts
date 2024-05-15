import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CaseReportOriginalService } from '../services/case-report-original.service';
import { UpdateCaseReportOriginalDto } from '../dto/update-case-report-original.dto';
import { Request } from 'express';
import { CaseReportOriginal } from '../entities/case-report-original.entity';
import { CreateCaseReportOriginalDto } from '../dto/create-case-report-original.dto';
import { ValidateCaseReportOriginalDto } from '../dto/validate-case-report-original.dto';


@Controller('case-report-original')
export class CaseReportOriginalController {
  constructor(
    private readonly CaseReportOriginalService: CaseReportOriginalService,
  ) {}

  @Post('/validateReports')
  async validateReportsExistence( @Body() data: any ) : Promise<any>{
    const { validateCaseReportOriginal } = data
    return await this.CaseReportOriginalService.validateReports(validateCaseReportOriginal);
  } 
  
  @Post('/createReportOriginal')
  async createReportOriginal(@Body() data: any, @Req() req: Request) : Promise<any>{
    const { createCaseReportOriginal, createMedicine, createDevice } = data;
    const clientIp = req['clientIp'];

    return await this.CaseReportOriginalService.createReportOriginal(
          createCaseReportOriginal,
          createMedicine,
          createDevice,
          clientIp,
        );
  }

  @Get('/listReportsOriginal')
  listReportsOriginal(): Promise<CaseReportOriginal[]> {
    return this.CaseReportOriginalService.findAllReportsOriginal();
  }

  @Get('/findReportOriginal/:id')
  findReportOriginal(@Param('id') id: number): Promise<CaseReportOriginal> {
    return this.CaseReportOriginalService.findOneReportOriginal(id);
  }

  @Patch('/updateReportOriginal/:id')
  updateReportOriginal(
    @Param('id') id: number,
    @Body() UpdateCaseReportOriginalDto: UpdateCaseReportOriginalDto,
  ): Promise<CaseReportOriginal> {
    return this.CaseReportOriginalService.updateReportOriginal(
      id,
      UpdateCaseReportOriginalDto,
    );
  }

  @Delete('/deleteReportOriginal/:id')
  deleteReportOriginal(@Param('id') id: number): Promise<CaseReportOriginal> {
    return this.CaseReportOriginalService.removeReportOriginal(id);
  }
}
