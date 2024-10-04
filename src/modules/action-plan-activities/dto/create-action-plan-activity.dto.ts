import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateActionPlanActivityDto {
  // @IsNumber()
  // @IsNotEmpty()
  // plan_aa_actionplan_id_fk: number;

  @IsString()
  @IsNotEmpty()
  plan_aa_userincharge_id: string;

  @IsString()
  @IsNotEmpty()
  plan_aa_nameincharge: string;

  @IsNumber()
  @IsNotEmpty()
  plan_aa_position_id_fk: number;

  @IsNotEmpty()
  @IsDateString()
  plan_aa_executiondate: Date;

  @IsNotEmpty()
  @IsString()
  plan_aa_descriptionactivity: string;

  @IsNotEmpty()
  @IsString()
  plan_aa_implementationplan: string;
}
