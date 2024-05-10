export class CreateMedicineDto {
    med_case_id_fk: number
    med_code: number
    med_name: string;
    med_description: string;
    med_status: boolean;
}
