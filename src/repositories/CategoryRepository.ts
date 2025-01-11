import type Repository from "@/repositories/Repository.ts";
import type {Category, Transaction} from "@/types.ts";
import type {ApiServiceType} from "@/services/api.ts";
import { api } from "@/services/api.ts";

class CategoryRepository implements Repository<Category> {

    constructor(private service: ApiServiceType) {}

    async findAll(params?: Object): Promise<Category[]> {
        const response = this.service.client.get('/categories', {
            params: params
        });
        return (await response).data.data as Category[];
    }

    async findOne(id: string, params?: Object): Promise<Category> {
        throw Error("Not implemented");
        return {} as Category;
    }
}

export default new CategoryRepository(api)