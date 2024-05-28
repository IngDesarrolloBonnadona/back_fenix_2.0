import { Repository } from "typeorm";
import { CaseReportOriginal } from "../../entities/case-report-original.entity";

export async function generateFilingNumber(
    caseReportOriginalRepository: Repository<CaseReportOriginal>
) {
    const lastReport = await caseReportOriginalRepository
    .createQueryBuilder('case_report_original')
    .select('case_report_original.ori_cr_filingnumber')
    .orderBy('case_report_original.ori_cr_filingnumber', 'DESC')
    .getOne();

    if (lastReport && lastReport.ori_cr_filingnumber) {
        const lastNumber = parseInt(lastReport.ori_cr_filingnumber, 10);
        const newNumber = lastNumber + 1;
        return newNumber.toString().padStart(10, '0');
    } else {
        return '0000000001'
    }
}