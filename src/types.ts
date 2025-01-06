interface Transaction {
    type: string;
    category_id: number;
    amount: number;
    frequency: string;
    description: string;
    date: string;
}

export type Category = {
    id: number;
    name?: string | null;
};

type TransactionSumByMonthAndType = {
    [month: string]: { income: number; expense: number };
};

export type { Transaction, TransactionSumByMonthAndType };