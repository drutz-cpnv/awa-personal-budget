import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { Category, Transaction } from '@/types';

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
   * @returns {Promise<Category[]>} A promise that resolves to the response containing all categories.
   */
  public async getCategories(): Promise<Category[]> {
    const response = this.apiClient.get('/categories');
    return (await response).data.data as Category[];
  }

  /**
   * Get all transactions.
   * @returns {Promise<Transaction[]>} A promise that resolves to the response containing all transactions.
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
   * @returns {Promise<Transaction>} A promise that resolves to the response containing the transaction.
   */
  public async getTransaction(id: number): Promise<Transaction> {
    const response = this.apiClient.get(`/transactions/${id}`);
    return (await response).data.data as Transaction;
  }

  /**
   * Get all transactions for a specific category.
   * @param {number} categoryId - The id of the category.
   * @returns {Promise<Transaction[]>} A promise that resolves to the response containing the transactions.
   */
  public async getTransactionsByCategory(categoryId: number): Promise<Transaction[]> {
    const response = this.apiClient.get(`/categories/${categoryId}/transactions`);
    return (await response).data.data as Transaction[];
  }

  /**
   * Create a new transaction.
   * @param {Transaction} transaction - The transaction to create.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the response containing the created transaction.
   */
  public async createTransaction(transaction: Transaction): Promise<AxiosResponse> {
    const response = this.apiClient.post('/transactions', transaction);
    return (await response);
  }

  /**
   * Update a transaction by id.
   * @param {number} id - The id of the transaction to update.
   * @param {Transaction} transaction - The updated transaction data.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the response containing the updated transaction.
   */
  public async updateTransaction(id: number, transaction: Transaction): Promise<AxiosResponse> {
    const response = this.apiClient.put(`/transactions/${id}`, transaction);
    return (await response);
  }

  /**
   * Delete a transaction by id.
   * @param {number} id - The id of the transaction to delete.
   * @returns {Promise<AxiosResponse>} A promise that resolves to the response containing the result of the deletion.
   */
  public async deleteTransaction(id: number): Promise<AxiosResponse> {
    const response = this.apiClient.delete(`/transactions/${id}`);
    return (await response);
  }
}

export default new ApiService();