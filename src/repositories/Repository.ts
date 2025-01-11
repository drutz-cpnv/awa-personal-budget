import type ApiServiceType from '@/services/api.ts'

export default interface Repository<T> {

    findAll(params?: Object): Promise<T[]>;
    findOne(id: string, params?: Object): Promise<T>;

}