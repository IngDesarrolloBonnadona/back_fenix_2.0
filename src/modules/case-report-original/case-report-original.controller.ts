import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaseReportOriginalService } from './case-report-original.service';
import { CreateCaseReportOriginalDto } from './dto/create-case-report-original.dto';
import { UpdateCaseReportOriginalDto } from './dto/update-case-report-original.dto';
import { CreateMedicineDto } from '../medicine/dto/create-medicine.dto';
import { CreateDeviceDto } from '../device/dto/create-device.dto';

@Controller('case-report-original')
export class CaseReportOriginalController {
  constructor(private readonly CaseReportOriginalService: CaseReportOriginalService) {}

  // @Post()
  // create(
  //   @Body() createCaseReportOriginal: CreateCaseReportOriginalDto,
  //   @Body() createMedicine: CreateMedicineDto[],
  //   @Body() createDevice: CreateDeviceDto[]
  // ) {
  //   return this.CaseReportOriginalService.createReportOriginalValidate(
  //     createCaseReportOriginal,
  //     createMedicine,
  //     createDevice
  //   );
  // }

  @Post()
  create( @Body() request: any) {
    const { createCaseReportOriginal, createMedicine, createDevice } = request
    return this.CaseReportOriginalService.createReportOriginalValidate(
      createCaseReportOriginal,
      createMedicine,
      createDevice
    )
  } 
  


  @Get()
  findAll() {
    return this.CaseReportOriginalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CaseReportOriginalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateCaseReportOriginalDto: UpdateCaseReportOriginalDto) {
    return this.CaseReportOriginalService.update(+id, UpdateCaseReportOriginalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CaseReportOriginalService.remove(+id);
  }
}
