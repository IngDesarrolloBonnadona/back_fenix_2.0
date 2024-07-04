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
import { ReasonReturnCaseService } from '../services/reason-return-case.service';
import { CreateReasonReturnCaseDto } from '../dto/create-reason-return-case.dto';
import { UpdateReasonReturnCaseDto } from '../dto/update-reason-return-case.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReasonReturnCase } from '../entities/reason-return-case.entity';

@ApiTags('reason-return-case')
@Controller('reason-return-case')
export class ReasonReturnCaseController {
  constructor(
    private readonly reasonReturnCaseService: ReasonReturnCaseService,
  ) {}

  @Post('/createReasonReturnCase')
  create(@Body() createReasonReturnCaseDto: CreateReasonReturnCaseDto): Promise<HttpException> {
    return this.reasonReturnCaseService.createReasonReturnCase(
      createReasonReturnCaseDto,
    );
  }

  @Get('/listReasonReturnCases')
  listReasonReturnCases(): Promise<ReasonReturnCase[]> {
    return this.reasonReturnCaseService.findAllReasonReturnCases();
  }

  @Get('/findReasonReturnCase/:id')
  findReasonReturnCase(@Param('id') id: number): Promise<ReasonReturnCase> {
    return this.reasonReturnCaseService.findOneReasonReturnCase(id);
  }

  @Patch('/updateReasonReturnCase/:id')
  updateReasonReturnCase(
    @Param('id') id: number,
    @Body() updateReasonReturnCaseDto: UpdateReasonReturnCaseDto,
  ): Promise<HttpException> {
    return this.reasonReturnCaseService.updateReasonReturnCase(
      id,
      updateReasonReturnCaseDto,
    );
  }

  @Delete('/deleteReasonReturnCase/:id')
  deleteReasonReturnCase(@Param('id') id: number): Promise<HttpException> {
    return this.reasonReturnCaseService.deleteReasonReturnCase(id);
  }
}
