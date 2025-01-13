import type {Transaction, TransactionSumByMonthAndType, TransactionSumByYearAndType, TransactionSumByMonthAndYearAndType} from "@/types.ts";

const currencyFormatter = new Intl.NumberFormat('fr-CH', { style: 'currency', currency: import.meta.env.VITE_CURRENCY })

export function toCHF(number: number) {
    return currencyFormatter.format(number)
}

export function groupDataByMonthAndType(d: Transaction[]): TransactionSumByMonthAndType {

    const grouped: TransactionSumByMonthAndType = {};

    d.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    d.map(item => {
        const date = new Date(item.date);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const type = item.type as "income" | "expense";
        if (!grouped[month]) {
            grouped[month] = {income: 0, expense: 0};
        }
        grouped[month][type] += item.amount;
    });

    return grouped;
}

export function groupDataByMonthAndYearAndType(d: Transaction[]): TransactionSumByMonthAndYearAndType {

    const grouped: TransactionSumByMonthAndYearAndType = {};

    d.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    d.map(item => {
        const date = new Date(item.date);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const type = item.type as "income" | "expense";
        if (!grouped[year]) {
            grouped[year] = {};
        }
        if (!grouped[year][month]) {
            grouped[year][month] = {income: [], expense: []};
        }

        grouped[year][month][type].push(item);
    });

    return grouped;
}

export function groupDataByYearAndType(d: Transaction[]): TransactionSumByMonthAndType {

    const grouped: TransactionSumByYearAndType = {};

    d.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    d.map(item => {
        const date = new Date(item.date);
        const year = date.getFullYear();
        const type = item.type as "income" | "expense";
        if (!grouped[year]) {
            grouped[year] = {income: 0, expense: 0};
        }
        grouped[year][type] += item.amount;
    });

    return grouped;
}