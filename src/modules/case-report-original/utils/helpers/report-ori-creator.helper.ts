import { caseTypeReport } from "src/enums/caseType-report.enum";
import { CreateOriAdverseEventReportDto } from "../../dto/create-ori-adverse-event-report.dto";
import { CreateOriComplicationsReportDto } from "../../dto/create-ori-complications-report.dto";
import { CreateOriIncidentReportDto } from "../../dto/create-ori-incident-report.dto";
import { CreateOriIndicatingUnsafeCareReportDto } from "../../dto/create-ori-indicating-unsafe-care-report.dto";
import { CreateOriRiskReportDto } from "../../dto/create-ori-risk-report.dto";


export const reportCreatorOriDictionary = {
    [caseTypeReport.RISK]: CreateOriRiskReportDto,
    [caseTypeReport.ADVERSE_EVENT]: CreateOriAdverseEventReportDto,
    [caseTypeReport.INCIDENT]: CreateOriIncidentReportDto,
    [caseTypeReport.INDICATING_UNSAFE_CARE]: CreateOriIndicatingUnsafeCareReportDto,
    [caseTypeReport.COMPLICATIONS]: CreateOriComplicationsReportDto,
    // agregar un tipo de caso nuevo
}