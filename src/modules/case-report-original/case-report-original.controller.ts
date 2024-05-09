import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CaseReportOriginalService } from './case-report-original.service';
import { UpdateCaseReportOriginalDto } from './dto/update-case-report-original.dto';
import { Request } from 'express';
import { CaseReportOriginal } from './entities/case-report-original.entity';

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
  create( 
    @Body() request: any, 
    @Req() req: Request
  ) {
    const { createCaseReportOriginal, createMedicine, createDevice } = request;
    const clientIp = req['clientIp'];   // Obtener la dirección IP del cliente del objeto Request
    
    const created = this.CaseReportOriginalService.createReportOriginalValidate(
      createCaseReportOriginal,
      createMedicine,
      createDevice,
      clientIp
    )

    return created;
  } 

  @Get()
  findAll() : Promise<CaseReportOriginal[]> {
    return this.CaseReportOriginalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) : Promise<CaseReportOriginal> {
    return this.CaseReportOriginalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() UpdateCaseReportOriginalDto: UpdateCaseReportOriginalDto
  ) : Promise<CaseReportOriginal> {
    return this.CaseReportOriginalService.update(+id, UpdateCaseReportOriginalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) : Promise<CaseReportOriginal> {
    return this.CaseReportOriginalService.remove(+id);
  }
}
