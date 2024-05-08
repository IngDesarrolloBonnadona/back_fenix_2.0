export class CreateCaseReportValidateDto {
    rcval_id_caso_original_FK: number
    rcval_id_tipocaso_FK: number
    rcval_id_paciente_FK: number;
    rcval_id_tipo_suceso_FK: number;
    rcval_id_servicio_FK: number;
    rcval_id_suceso_FK: number;
    rcval_id_tipo_riesgo_FK: number;
    rcval_id_clasif_severidad_FK: number;
    rcval_id_fuente_FK: number;
    rcval_id_subfuente_FK: number;
    rcval_id_nivel_riesgo_FK: number;
    rcval_id_unidad_FK: number;
    rcval_id_reportante_FK: number;
    rcval_descripcion: string;
    rcval_acc_inmediatas: string;
    rcval_ries_materializado: boolean;
    rcval_pac_asociado: boolean;
    rcval_validado: boolean;
    rcval_estado: boolean;
}
