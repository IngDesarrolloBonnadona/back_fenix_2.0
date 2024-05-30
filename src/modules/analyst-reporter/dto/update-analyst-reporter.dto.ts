import { PartialType } from '@nestjs/swagger';
import { CreateAnalystReporterDto } from './create-analyst-reporter.dto';

export class UpdateAnalystReporterDto extends PartialType(CreateAnalystReporterDto) {}
