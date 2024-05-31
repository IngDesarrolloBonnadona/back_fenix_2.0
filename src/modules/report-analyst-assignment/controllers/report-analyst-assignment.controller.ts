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

  @Post('assingAnalystReporter/:idValidator')
  createAssingAnalystReporter(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: number,
  ) {
    return this.ReportAnalisysAssignmentService.AssingAnalyst(
      createAnalystReporterDto,
      clientIp,
      idValidator,
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

  @Put('updateAssignedAnalyst/:id')
  updateAssignedAnalyst(
    @Param('id') id: number,
    @Body() updateReportAnalystAssignmentDto: UpdateReportAnalystAssignmentDto,
  ) {
    return this.ReportAnalisysAssignmentService.updateAssignedAnalyst(
      id,
      updateReportAnalystAssignmentDto,
    );
  }

  @Delete('deleteAssignedAnalyst/:id')
  deleteAssignedAnalyst(@Param('id') id: number) {
    return this.ReportAnalisysAssignmentService.deleteAssignedAnalyst(id);
  }
}
