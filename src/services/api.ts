import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { Transaction } from '@/types';

/**
 * API service to interact with the backend.
 * It uses Axios to make HTTP requests.
 * You'll need to have a .env file with the following variables:
 * - VITE_API_BASE_URL: The base URL of the API.
 */
class ApiService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get all categories.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the response containing all categories.
   */
  public getCategories(): Promise<AxiosResponse> {
    return this.apiClient.get('/categories');
  }

  /**
   * Get all transactions.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the response containing all transactions.
   */
  public async getTransactions(count: number|null = null): Promise<Transaction[]> {
      const response = this.apiClient.get('/transactions', {
          params: {
              count: count
          }
      });
      return (await response).data.data as Transaction[];
  }

  /**
   * Get a single transaction by id.
   * @param {number} id - The id of the transaction.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the response containing the transaction.
   */
  public getTransaction(id: number): Promise<AxiosResponse> {
    return this.apiClient.get(`/transactions/${id}`);
  }

  /**
   * Get all transactions for a specific category.
   * @param {number} categoryId - The id of the category.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the response containing the transactions.
   */
  public getTransactionsByCategory(categoryId: number): Promise<AxiosResponse> {
    return this.apiClient.get(`/categories/${categoryId}/transactions`);
  }

  /**
   * Create a new transaction.
   * @param {Transaction} transaction - The transaction to create.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the response containing the created transaction.
   */
  public createTransaction(transaction: Transaction): Promise<AxiosResponse> {
    return this.apiClient.post('/transactions', transaction);
  }

  /**
   * Update a transaction by id.
   * @param {number} id - The id of the transaction to update.
   * @param {Transaction} transaction - The updated transaction data.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the response containing the updated transaction.
   */
  public updateTransaction(id: number, transaction: Transaction): Promise<AxiosResponse> {
    return this.apiClient.put(`/transactions/${id}`, transaction);
  }

  /**
   * Delete a transaction by id.
   * @param {number} id - The id of the transaction to delete.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the response containing the result of the deletion.
   */
  public deleteTransaction(id: number): Promise<AxiosResponse> {
    return this.apiClient.delete(`/transactions/${id}`);
  }
}

export default new ApiService();