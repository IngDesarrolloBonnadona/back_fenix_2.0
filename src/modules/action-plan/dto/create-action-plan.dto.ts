import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ActionPlanActivity } from 'src/modules/action-plan-activities/entities/action-plan-activity.entity';

export class CreateActionPlanDto {
  @IsNotEmpty()
  @IsString()
  plan_a_name: string;

  @IsOptional()
  @IsString()
  plan_a_description: string;

  @IsNotEmpty()
  @IsString()
  plan_a_userresponsible_id: string;

  @IsNumber()
  @IsNotEmpty()
  plan_a_casetype_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  plan_a_eventtype_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  plan_a_event_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  plan_a_service_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  plan_a_unit_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  plan_a_priority_id_fk: number;

  @IsNotEmpty()
  @IsString()
  plan_a_rootcause: string;

  @IsNotEmpty()
  @IsString()
  plan_a_whydescription: string;

  @IsNotEmpty()
  @IsDateString()
  plan_a_closingdate: Date;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionPlanActivity)
  actionPlanActivity: ActionPlanActivity[];
}
