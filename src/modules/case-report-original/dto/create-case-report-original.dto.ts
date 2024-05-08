export class CreateCaseReportOriginalDto {
    rcori_id_tipocaso_FK: number
    rcori_id_paciente_FK: number;
    rcori_id_reportante_FK: number;
    rcori_id_tipo_suceso_FK: number;
    rcori_id_servicio_FK: number;
    rcori_id_suceso_FK: number;
    rcori_id_tipo_riesgo_FK: number;
    rcori_id_clasif_severidad_FK: number;
    rcori_id_fuente_FK: number;
    rcori_id_subfuente_FK: number;
    rcori_id_nivel_riesgo_FK: number;
    rcori_id_unidad_FK: number;
    rcori_descripcion: string;
    rcori_acc_inmediatas: string;
    rcori_ries_materializado: boolean;
    rcori_pac_asociado: boolean;
    rcori_estado: boolean;
}
