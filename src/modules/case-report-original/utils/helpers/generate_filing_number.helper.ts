import { Repository } from "typeorm";
import { CaseReportOriginal } from "../../entities/case-report-original.entity";

export async function generateFilingNumber(
    caseReportOriginalRepository: Repository<CaseReportOriginal>
) {
    const lastReport = await caseReportOriginalRepository
    // .createQueryBuilder('case_report_original')
    // .select('case_report_original.ori_cr_filingnumber')
    // .orderBy('case_report_original.ori_cr_filingnumber', 'DESC')
    // .getOne();

    // let newNumber: number;

    // if (lastReport && lastReport.ori_cr_filingnumber) {
    //     const lastNumber = parseInt(lastReport.ori_cr_filingnumber, 10);
    //     newNumber = lastNumber + 1;
    // } else {
    //     newNumber = 1
    // }

    // return newNumber.toString().padStart(10, '0');

    .createQueryBuilder('case_report_original')
    .select('case_report_original.ori_cr_filingnumber')
    .orderBy('case_report_original.createdAt', 'DESC')
    .getOne();

    let newNumber: number;

    if (lastReport && lastReport.ori_cr_filingnumber) {
        const lastNumber = parseInt(lastReport.ori_cr_filingnumber, 10);
        newNumber = lastNumber + 1;
    } else {
        newNumber = 1
    }
    
    const lengthToPad = newNumber.toString().length + 1;
    const filingNumber = newNumber.toString().padStart(lengthToPad, '0');

    return filingNumber;
}