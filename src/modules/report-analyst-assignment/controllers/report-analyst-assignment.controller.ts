import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Ip,
  Query,
  HttpException,
} from '@nestjs/common';
import { ReportAnalystAssignmentService } from '../services/report-analyst-assignment.service';
import { ReportAnalystAssignmentDto } from '../dto/analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReportAnalystAssignment } from '../entities/report-analyst-assignment.entity';

@ApiTags('report-analyst-assignment')
@Controller('report-analyst-assignment')
export class ReportAnalystAssignmentController {
  constructor(
    private readonly ReportAnalisysAssignmentService: ReportAnalystAssignmentService,
  ) {}

  @Post('assingAnalyst/')
  createAssingAnalystReporter(
    @Body() createAnalystReporterDto: ReportAnalystAssignmentDto,
    @Ip() clientIp: string,
  ): Promise<ReportAnalystAssignment> {
    return this.ReportAnalisysAssignmentService.assingAnalyst(
      createAnalystReporterDto,
      clientIp,
    );
  }

  @Post('returnCaseBetweenAnalyst/:idAnalyst')
  createReturnCaseBetweenAnalyst(
    @Body() createAnalystReporterDto: ReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: number,
  ): Promise<ReportAnalystAssignment> {
    return this.ReportAnalisysAssignmentService.returnCaseBetweenAnalyst(
      createAnalystReporterDto,
      clientIp,
      idAnalyst,
    );
  }

  @Get('listAssignedAnalystsByPosition')
  async listAssignedAnalystsByPosition(
    @Query('positionId') positionId?: number,
  ): Promise<ReportAnalystAssignment[]> {
    return await this.ReportAnalisysAssignmentService.findAssignedAnalystsByPosition(
      positionId,
    );
  }

  @Get('findAssignedAnalyst/:id')
  findAssignedAnalyst(@Param('id') id: number) {
    return this.ReportAnalisysAssignmentService.findOneAssignedAnalyst(id);
  }

  @Get('findInfoAnalyst/:code')
  findInfoAnalyst(@Param('code') code?: number) {
    return this.ReportAnalisysAssignmentService.findOneAnalyst(code)
  }

  @Put('updateReAssignedAnalyst/')
  updateReAssignedAnalyst(
    @Body() updateReportAnalystAssignmentDto: UpdateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
  ): Promise<HttpException> {
    return this.ReportAnalisysAssignmentService.reAssingAnalyst(
      updateReportAnalystAssignmentDto,
      clientIp,
    );
  }

  @Delete('deleteAssignedAnalyst/:id')
  deleteAssignedAnalyst(@Param('id') id: number) {
    return this.ReportAnalisysAssignmentService.deleteAssignedAnalyst(id);
  }
}
