import { CreateOriAdverseEventReportDto } from "../../dto/create-ori-adverse-event-report.dto";
import { CreateOriComplicationsReportDto } from "../../dto/create-ori-complications-report.dto";
import { CreateOriIncidentReportDto } from "../../dto/create-ori-incident-report.dto";
import { CreateOriIndicatingUnsafeCareReportDto } from "../../dto/create-ori-indicating-unsafe-care-report.dto";
import { CreateOriRiskReportDto } from "../../dto/create-ori-risk-report.dto";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

export async function validateDtoByCaseType(dto: any): Promise<any> {
    let specificDtoClass: any;
    // console.log(dto)
    switch (dto.ori_cr_casetype_id_fk) {
        case 1:
            specificDtoClass = CreateOriRiskReportDto;
            break;
        case 2:
            specificDtoClass = CreateOriAdverseEventReportDto;
            break;
        case 3:
            specificDtoClass = CreateOriIncidentReportDto;
            break;
        case 4:
            specificDtoClass = CreateOriIndicatingUnsafeCareReportDto;
            break;
        case 5:
            specificDtoClass = CreateOriComplicationsReportDto;
            break;
        default:
            throw new Error('¡Id tipo de caso invalido.!')
    }
    const specificDtoInstance = plainToInstance(specificDtoClass, dto);
    await validateOrReject(specificDtoClass);

    return specificDtoInstance
}