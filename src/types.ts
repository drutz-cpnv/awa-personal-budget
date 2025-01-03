interface Transaction {
    type: string;
    category_id: number;
    amount: number;
    frequency: string;
    description: string;
    date: string;
}

export type Categories = {
    id: number;
    name?: string | null;
};

export type Transactions = {
    amount?: number | null;
    category?: number | Categories | null;
    date?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    description?: string | null;
    frequency?: string | null;
    id: number;
    type?: string | null;
};

export type Schema = {
    categories: Categories[];
    transactions: Transactions[];
};

type TransactionSumByMonthAndType = {
    [month: string]: { income: number; expense: number };
};

export type { Transaction, TransactionSumByMonthAndType };