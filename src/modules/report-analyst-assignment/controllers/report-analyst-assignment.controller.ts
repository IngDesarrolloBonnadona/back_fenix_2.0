import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Ip,
} from '@nestjs/common';
import { ReportAnalystAssignmentService } from '../services/report-analyst-assignment.service';
import { CreateReportAnalystAssignmentDto } from '../dto/create-report-analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('report-analyst-assignment')
@Controller('report-analyst-assignment')
export class ReportAnalystAssignmentController {
  constructor(
    private readonly ReportAnalisysAssignmentService: ReportAnalystAssignmentService,
  ) {}

  @Post('assingAnalyst/:idValidator')
  createAssingAnalystReporter(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: number,
  ) {
    return this.ReportAnalisysAssignmentService.assingAnalyst(
      createAnalystReporterDto,
      clientIp,
      idValidator,
    );
  }

  @Post('returnCaseBetweenAnalyst/:idAnalyst')
  createReturnCaseBetweenAnalyst(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: number,
  ) {
    return this.ReportAnalisysAssignmentService.returnCaseBetweenAnalyst(
      createAnalystReporterDto,
      clientIp,
      idAnalyst,
    );
  }

  @Get('listAssignedAnalysts')
  listAssignedAnalysts() {
    return this.ReportAnalisysAssignmentService.findAllAssignedAnalysts();
  }

  @Get('findAssignedAnalyst/:id')
  findAssignedAnalyst(@Param('id') id: number) {
    return this.ReportAnalisysAssignmentService.findOneAssignedAnalyst(id);
  }

  @Put('updateReAssignedAnalyst/:idValidator')
  updateReAssignedAnalyst(
    @Body() updateReportAnalystAssignmentDto: UpdateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: number,
  ) {
    return this.ReportAnalisysAssignmentService.reAssingAnalyst(
      updateReportAnalystAssignmentDto,
      clientIp,
      idValidator,
    );
  }

  @Delete('deleteAssignedAnalyst/:id')
  deleteAssignedAnalyst(@Param('id') id: number) {
    return this.ReportAnalisysAssignmentService.deleteAssignedAnalyst(id);
  }
}
