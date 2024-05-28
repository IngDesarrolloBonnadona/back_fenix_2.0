import { EntityManager } from "typeorm";

async function getLastFilingNumber(
    entityManager: EntityManager
): Promise<string | null> {
    try {
        const lastFilingNumber = await entityManager.query(`
            SELECT ori_cr_filingnumber
            FROM case_report_original
            ORDER BY "createdAt" DESC
            LIMIT 1
        `);

        return lastFilingNumber.length > 0
            ? lastFilingNumber[0].ori_cr_filingnumber
            : null;
    } catch (error) {
        throw error;
    }
}

export async function generateFilingNumber(
    entityManager: EntityManager
) {
    try {
        const lastFilingNumber = await getLastFilingNumber(entityManager);
        const nextNumber = lastFilingNumber
        ? parseInt(lastFilingNumber.split('-')[1]) + 1
        : 1;

        console.log(lastFilingNumber)
        const filingNumber = nextNumber.toString().padStart(7, '0');
        console.log(filingNumber)

        return filingNumber;
    } catch (error) {
        throw error;
    }
}