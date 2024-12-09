interface Transaction {
    type: string;
    category_id: number;
    amount: number;
    frequency: string;
    description: string;
    date: string;
  }

export type { Transaction };