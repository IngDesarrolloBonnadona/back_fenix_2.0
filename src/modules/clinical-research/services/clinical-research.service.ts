import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClinicalResearchDto } from '../dto/create-clinical-research.dto';
import { UpdateClinicalResearchDto } from '../dto/update-clinical-research.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalResearch as ClinicalResearchEntity } from '../entities/clinical-research.entity';
import { DataSource, Repository } from 'typeorm';
import { ResearchInstrumentService } from 'src/modules/research-instrument/services/research-instrument.service';
import { DeviceTypeService } from 'src/modules/device-type/services/device-type.service';
import { DamageTypeService } from 'src/modules/damage-type/services/damage-type.service';
import { FluidTypeService } from 'src/modules/fluid-type/services/fluid-type.service';
import { RiskFactorService } from 'src/modules/risk-factor/services/risk-factor.service';
import { SafetyBarriersService } from 'src/modules/safety-barriers/services/safety-barriers.service';

@Injectable()
export class ClinicalResearchService {
  constructor(
    @InjectRepository(ClinicalResearchEntity)
    private readonly clinicalResearchRepository: Repository<ClinicalResearchEntity>,

    private dataSource: DataSource,
    private readonly researchInstrumentService: ResearchInstrumentService,
    private readonly deviceTypeService: DeviceTypeService,
    private readonly damageTypeService: DamageTypeService,
    private readonly fluidTypeService: FluidTypeService,
    private readonly riskFactorService: RiskFactorService,
    private readonly safetyBarriersService: SafetyBarriersService,
  ) {}

  async saveProgressClinicalResearch(
    createClinicalResearchDto: CreateClinicalResearchDto,
    id: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all([
        createClinicalResearchDto.res_c_instrument_id_fk &&
          this.researchInstrumentService.findOneResearchInstrument(
            createClinicalResearchDto.res_c_instrument_id_fk,
          ),
        createClinicalResearchDto.res_c_devicetype_id_fk &&
          this.deviceTypeService.findOneDeviceType(
            createClinicalResearchDto.res_c_devicetype_id_fk,
          ),
        createClinicalResearchDto.res_c_damagetype_id_fk &&
          this.damageTypeService.findOneDamageType(
            createClinicalResearchDto.res_c_damagetype_id_fk,
          ),
        createClinicalResearchDto.res_c_fluidtype_id_fk &&
          this.fluidTypeService.findOneFluidTypes(
            createClinicalResearchDto.res_c_fluidtype_id_fk,
          ),
        createClinicalResearchDto.res_c_riskfactors_id_fk &&
          this.riskFactorService.findOneRiskFactor(
            createClinicalResearchDto.res_c_riskfactors_id_fk,
          ),
        createClinicalResearchDto.res_c_safetybarriers_id_fk &&
          this.safetyBarriersService.findOneSafetyBarrier(
            createClinicalResearchDto.res_c_safetybarriers_id_fk,
          ),
      ]);

      let progress: ClinicalResearchEntity;
      if (id) {
        progress = await this.clinicalResearchRepository.findOne({
          where: { id },
        });

        if (!progress) {
          throw new HttpException(
            `No se encontró el progreso guardado.`,
            HttpStatus.NO_CONTENT,
          );
        }
        queryRunner.manager.merge(
          ClinicalResearchEntity,
          progress,
          createClinicalResearchDto,
        );
      } else {
        progress = this.clinicalResearchRepository.create(
          createClinicalResearchDto,
        );
      }

      await queryRunner.manager.save(progress);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all clinicalResearch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalResearch`;
  }

  update(id: number, updateClinicalResearchDto: UpdateClinicalResearchDto) {
    return `This action updates a #${id} clinicalResearch`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalResearch`;
  }
}
