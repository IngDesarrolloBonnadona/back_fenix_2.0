import { caseTypeReport } from "src/enums/caseType-report.enum";
import { CreateValRiskReportDto } from "../dto/create-val-risk-report.dto";
import { CreateValAdverseEventReportDto } from "../dto/create-val-adverse-event-report.dto";
import { CreateValIncidentReportDto } from "../dto/create-val-incident-report.dto";
import { CreateValIndicatingUnsafeCareReportDto } from "../dto/create-val-indicating-unsafe-care-report.dto";
import { CreateValComplicationsReportDto } from "../dto/create-val-complications-report.dto";

export const reportCreatorValDictionary = {
    [caseTypeReport.RISK]: CreateValRiskReportDto,
    [caseTypeReport.ADVERSE_EVENT]: CreateValAdverseEventReportDto,
    [caseTypeReport.INCIDENT]: CreateValIncidentReportDto,
    [caseTypeReport.INDICATING_UNSAFE_CARE]: CreateValIndicatingUnsafeCareReportDto,
    [caseTypeReport.COMPLICATIONS]: CreateValComplicationsReportDto,
}