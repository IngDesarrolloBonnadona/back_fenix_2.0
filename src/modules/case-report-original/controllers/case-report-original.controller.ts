import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
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
  async listReportsOriginal(): Promise<CaseReportOriginal[]> {
    return await this.CaseReportOriginalService.findAllReportsOriginal();
  }

  @Get('/findReportOriginal/:id')
  async findReportOriginal(@Param('id') id: number): Promise<CaseReportOriginal> {
    return await this.CaseReportOriginalService.findOneReportOriginal(id);
  }

  @Patch('/updateReportOriginal/:id')
  async updateReportOriginal(
    @Param('id') id: number,
    @Body() UpdateCaseReportOriginalDto: UpdateCaseReportOriginalDto,
  ): Promise<CaseReportOriginal> {
    return await this.CaseReportOriginalService.updateReportOriginal(
      id,
      UpdateCaseReportOriginalDto,
    );
  }

  @Delete('/deleteReportOriginal/:id')
  async deleteReportOriginal(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.CaseReportOriginalService.deleteReportOriginal(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
