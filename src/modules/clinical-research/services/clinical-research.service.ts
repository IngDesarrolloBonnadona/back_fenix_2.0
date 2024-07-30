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
import { ClinicalResearchInfluencingFactorService } from 'src/modules/clinical-research-influencing-factor/services/clinical-research-influencing-factor.service';
import { InfluencingFactorService } from 'src/modules/influencing-factor/services/influencing-factor.service';

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
    private readonly clinicalResearchInfluencingFactorService: ClinicalResearchInfluencingFactorService,
    private readonly influencingFactorService: InfluencingFactorService,
  ) {}

  async saveProgressClinicalResearch(
    createClinicalResearchDto: CreateClinicalResearchDto,
    clinicalResearchId: string,
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

      if (createClinicalResearchDto.influencingFactor) {
        for (const factor of createClinicalResearchDto.influencingFactor) {
          await this.influencingFactorService.findOneInfluencingFactor(
            factor.inf_fcr_influencingfactor_id_fk,
          );
        }
      }

      let progress: ClinicalResearchEntity;

      if (clinicalResearchId) {
        progress = await queryRunner.manager.findOne(ClinicalResearchEntity, {
          where: { id: clinicalResearchId },
        });

        if (!progress) {
          throw new HttpException(
            `No se encontró el progreso guardado.`,
            HttpStatus.NO_CONTENT,
          );
        }
        const { influencingFactor, ...updateFields } =
          createClinicalResearchDto;

        queryRunner.manager.update(
          ClinicalResearchEntity,
          progress.id,
          updateFields,
        );
      } else {
        progress = queryRunner.manager.create(
          ClinicalResearchEntity,
          createClinicalResearchDto,
        );

        await queryRunner.manager.save(progress);
      }

      const hasClinicalResearchInfluencingFactor =
        createClinicalResearchDto.influencingFactor &&
        createClinicalResearchDto.influencingFactor.length > 0;

      if (hasClinicalResearchInfluencingFactor) {
        await this.clinicalResearchInfluencingFactorService.createClinicalResearchInfluencingFactorTransaction(
          createClinicalResearchDto.influencingFactor,
          clinicalResearchId || progress.id,
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();

      return new HttpException(`Progreso guardado.`, HttpStatus.CREATED);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(
        `Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAllClinicalResearchs() {
    const clinicalResearchs = await this.clinicalResearchRepository.find({
      where: { res_c_status: true },
    });

    if (clinicalResearchs.length === 0) {
      throw new HttpException(
        'No se encontró la lista de investigaciones clínicas.',
        HttpStatus.NO_CONTENT,
      );
    }

    return clinicalResearchs;
  }

  async findOneClinicalResearch(id: string) {
    const clinicalResearch = await this.clinicalResearchRepository.findOne({
      where: { id, res_c_status: true },
      relations: {
        clinicalResearchInfluencingFactor: { influencingFactor: true },
      },
    });

    if (!clinicalResearch) {
      throw new HttpException(
        'No se encontró la investigación clínica.',
        HttpStatus.NO_CONTENT,
      );
    }

    return clinicalResearch;
  }

  // update(id: string, updateClinicalResearchDto: UpdateClinicalResearchDto) {
  //   return `This action updates a #${id} clinicalResearch`;
  // }

  async deleteClinicalResearch(id: string) {
    const clinicalResearch = await this.clinicalResearchRepository.findOne({
      where: { id, res_c_status: true },
    });

    const result = await this.clinicalResearchRepository.softDelete(
      clinicalResearch.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la investigación clínica.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
