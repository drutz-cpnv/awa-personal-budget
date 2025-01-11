import type Repository from "@/repositories/Repository.ts";
import type {Transaction} from "@/types.ts";
import type {ApiServiceType} from "@/services/api.ts";
import { api } from "@/services/api.ts";
import type {AxiosResponse} from "axios";

class TransactionRepository implements Repository<Transaction> {

    constructor(private service: ApiServiceType) {}

    async findAll(params?: Object): Promise<Transaction[]> {
        const response = this.service.client.get('/transactions', {
            params: params
        });
        return (await response).data.data as Transaction[];
    }

    async findOne(id: string, params?: Object): Promise<Transaction> {
        const response = this.service.client.get(`/transactions/${id}`);
        return (await response).data.data as Transaction;
    }

    async findByCategory(categoryId: string, params?: Object): Promise<Transaction[]> {
        const response = this.service.client.get(`/transactions/${categoryId}/transactions`);
        return (await response).data.data as Transaction[];
    }

    async update(transaction: Transaction): Promise<AxiosResponse> {
        const response = this.service.client.put(`/transactions/${transaction.id}`, transaction);
        return (await response);
    }

    async delete(id: string): Promise<AxiosResponse> {
        const response = this.service.client.delete(`/transactions/${id}`);
        return (await response);
    }

    async create(transaction: Transaction): Promise<AxiosResponse> {
        const response = this.service.client.post(`/transactions`, transaction);
        return (await response);
    }
}

export default new TransactionRepository(api)