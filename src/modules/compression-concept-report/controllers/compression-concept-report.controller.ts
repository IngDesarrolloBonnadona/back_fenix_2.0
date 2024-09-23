import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompressionConceptReportService } from '../services/compression-concept-report.service';
import { CreateCompressionConceptReportDto } from '../dto/create-compression-concept-report.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('compression-concept-report')
@Controller('compression-concept-report')
export class CompressionConceptReportController {
  constructor(
    private readonly compressionConceptReportService: CompressionConceptReportService,
  ) {}

  @Post('/createCompressionConceptReport')
  createCompressionConceptReport(
    @Body()
    createCompressionConceptReportDto: CreateCompressionConceptReportDto,
  ) {
    return this.compressionConceptReportService.createCompressionConceptReport(
      createCompressionConceptReportDto,
    );
  }

  @Get('/listCompressionConceptReports')
  listCompressionConceptReports() {
    return this.compressionConceptReportService.findAllCompressionConceptReports();
  }

  @Get('/findCompressionConceptReport/:id')
  findCompressionConceptReport(@Param('id') id: number) {
    return this.compressionConceptReportService.findOneCompressionConceptReport(
      id,
    );
  }
}
