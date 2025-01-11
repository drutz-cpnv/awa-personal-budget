interface Transaction {
    id?: number;
    type: "income" | "expense";
    category_id: number | string;
    amount: number;
    frequency: string;
    description: string;
    date?: string;
}

export type Category = {
    id: number;
    name: string;
};

export type TransactionYear = {
    year: string;
}

type TransactionSumByMonthAndType = {
    [month: string]: { income: number; expense: number };
};

export type TransactionSumByYearAndType = {
    [month: string]: { income: number; expense: number };
};

export type { Transaction, TransactionSumByMonthAndType };