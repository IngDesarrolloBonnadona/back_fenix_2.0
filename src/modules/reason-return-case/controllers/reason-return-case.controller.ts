import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReasonReturnCaseService } from '../services/reason-return-case.service';
import { CreateReasonReturnCaseDto } from '../dto/create-reason-return-case.dto';
import { UpdateReasonReturnCaseDto } from '../dto/update-reason-return-case.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reason-return-case')
@Controller('reason-return-case')
export class ReasonReturnCaseController {
  constructor(
    private readonly reasonReturnCaseService: ReasonReturnCaseService,
  ) {}

  @Post('/createReasonReturnCase')
  create(@Body() createReasonReturnCaseDto: CreateReasonReturnCaseDto) {
    return this.reasonReturnCaseService.createReasonReturnCase(
      createReasonReturnCaseDto,
    );
  }

  @Get('/listReasonReturnCases')
  listReasonReturnCases() {
    return this.reasonReturnCaseService.findAlReasonReturnCases();
  }

  @Get('/findReasonReturnCase/:id')
  findReasonReturnCase(@Param('id') id: number) {
    return this.reasonReturnCaseService.findOneReasonReturnCase(id);
  }

  @Patch('/updateReasonReturnCase/:id')
  updateReasonReturnCase(
    @Param('id') id: number,
    @Body() updateReasonReturnCaseDto: UpdateReasonReturnCaseDto,
  ) {
    return this.reasonReturnCaseService.updateReasonReturnCase(
      id,
      updateReasonReturnCaseDto,
    );
  }

  @Delete('/deleteReasonReturnCase/:id')
  deleteReasonReturnCase(@Param('id') id: number) {
    return this.reasonReturnCaseService.deleteReasonReturnCase(id);
  }
}
