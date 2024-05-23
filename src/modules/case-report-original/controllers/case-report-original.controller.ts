import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, Put, } from '@nestjs/common';
import { CaseReportOriginalService } from '../services/case-report-original.service';
import { CreateReportDto } from '../utils/helpers/dto-validator.helper';
import { UpdateCaseReportOriginalDto } from '../dto/update-case-report-original.dto';
import { Request } from 'express';
import { CaseReportOriginal } from '../entities/case-report-original.entity';
import { ApiTags } from '@nestjs/swagger';
import { ValidateCaseReportOriginalDto } from '../dto/validate-case-report-original.dto';

@ApiTags('case-report-original')
@Controller('case-report-original')
export class CaseReportOriginalController {
  constructor(
    private readonly CaseReportOriginalService: CaseReportOriginalService,
  ) {}

  @Post('/validateReports')
  async validateReportsExistence( @Body() validateCaseReportOriginal: ValidateCaseReportOriginalDto ) : Promise<any>{
    // const { validateCaseReportOriginal } = data
    return await this.CaseReportOriginalService.validateReports(validateCaseReportOriginal);
  } 
  
  @Post('/createReportOriginal')
  async createReportOriginal(
    @Body() createReportDto: CreateReportDto, 
    @Req() req: Request
  ) : Promise<any>{
    const clientIp = req.ip;
    return await this.CaseReportOriginalService.createReportOriginal(
      createReportDto,
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

  @Put('/updateReportOriginal/:id')
  async updateReportOriginal(
    @Param('id') id: number,
    @Body() UpdateCaseReportOriginalDto: UpdateCaseReportOriginalDto,
  ): Promise<HttpException> {
    return await this.CaseReportOriginalService.updateReportOriginal(
      id,
      UpdateCaseReportOriginalDto,
    );
  }

  @Delete('/deleteReportOriginal/:id')
  async deleteReportOriginal(@Param('id') id: number): Promise<HttpException> {
    return await this.CaseReportOriginalService.deleteReportOriginal(id);
  }
}
