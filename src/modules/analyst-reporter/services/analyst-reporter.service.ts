import { Injectable } from '@nestjs/common';
import { CreateAnalystReporterDto } from '../dto/create-analyst-reporter.dto';
import { UpdateAnalystReporterDto } from '../dto/update-analyst-reporter.dto';

@Injectable()
export class AnalystReporterService {
  create(createAnalystReporterDto: CreateAnalystReporterDto) {
    return 'This action adds a new analystReporter';
  }

  findAll() {
    return `This action returns all analystReporter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analystReporter`;
  }

  update(id: number, updateAnalystReporterDto: UpdateAnalystReporterDto) {
    return `This action updates a #${id} analystReporter`;
  }

  remove(id: number) {
    return `This action removes a #${id} analystReporter`;
  }
}
