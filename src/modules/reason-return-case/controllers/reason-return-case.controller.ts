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

@Controller('reason-return-case')
export class ReasonReturnCaseController {
  constructor(
    private readonly reasonReturnCaseService: ReasonReturnCaseService,
  ) {}

  @Post()
  create(@Body() createReasonReturnCaseDto: CreateReasonReturnCaseDto) {
    return this.reasonReturnCaseService.create(createReasonReturnCaseDto);
  }

  @Get()
  findAll() {
    return this.reasonReturnCaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reasonReturnCaseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReasonReturnCaseDto: UpdateReasonReturnCaseDto,
  ) {
    return this.reasonReturnCaseService.update(+id, updateReasonReturnCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reasonReturnCaseService.remove(+id);
  }
}
