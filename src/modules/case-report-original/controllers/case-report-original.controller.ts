import { Controller, Get, Post, Body, Param, Delete, HttpException, Put, Ip, } from '@nestjs/common';
import { CaseReportOriginalService } from '../services/case-report-original.service';
import { CreateReportOriDto } from '../utils/helpers/ori-dto-validator.helper';
import { UpdateCaseReportOriginalDto } from '../dto/update-case-report-original.dto';
import { CaseReportOriginal } from '../entities/case-report-original.entity';
import { ApiTags } from '@nestjs/swagger';
import { ValidateCaseReportOriginalDto } from '../dto/validate-case-report-original.dto';

@ApiTags('case-report-original')
@Controller('case-report-original')
export class CaseReportOriginalController {
  constructor(
    private readonly CaseReportOriginalService: CaseReportOriginalService,
  ) {}

  @Post('/validateReportsExistence')
  async validateReportsExistence( @Body() validateCaseReportOriginal: ValidateCaseReportOriginalDto ) : Promise<any>{
    return await this.CaseReportOriginalService.validateReports(validateCaseReportOriginal);
  } 
  
  @Post('/createReportOriginal')
  async createReportOriginal(
    @Body() createReportOriDto: CreateReportOriDto, 
    @Ip() clientIp: string
    // @Req() req: Request
  ) : Promise<any>{
    // const clientIp = req.ip;
    return await this.CaseReportOriginalService.createReportOriginal(
      createReportOriDto,
      clientIp,
    );
  }

  @Get('/listReportsOriginal')
  async listReportsOriginal(): Promise<CaseReportOriginal[]> {
    return await this.CaseReportOriginalService.findAllReportsOriginal();
  }

  @Get('/findReportOriginal/:id')
  async findReportOriginal(@Param('id') id: string): Promise<CaseReportOriginal> {
    return await this.CaseReportOriginalService.findOneReportOriginal(id);
  }

  @Put('/updateReportOriginal/:id')
  async updateReportOriginal(
    @Param('id') id: string,
    @Body() UpdateCaseReportOriginalDto: UpdateCaseReportOriginalDto,
  ): Promise<HttpException> {
    return await this.CaseReportOriginalService.updateReportOriginal(
      id,
      UpdateCaseReportOriginalDto,
    );
  }

  @Delete('/deleteReportOriginal/:id')
  async deleteReportOriginal(@Param('id') id: string): Promise<HttpException> {
    return await this.CaseReportOriginalService.deleteReportOriginal(id);
  }
}
