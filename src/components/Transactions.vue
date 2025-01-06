<template>
  <div class="max-w-4xl p-5 mx-auto">
    <h1 class="mb-5 text-2xl font-bold">Transaction List</h1>
    <!-- Show loading state -->
    <div v-if="loading" class="py-5 text-center">Loading...</div>
    <!-- Show table when data is loaded -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full border border-collapse border-gray-300 table-auto">
        <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left border border-gray-300">ID</th>
          <th class="px-4 py-2 text-left border border-gray-300">Date</th>
          <th class="px-4 py-2 text-left border border-gray-300">Amount</th>
          <th class="px-4 py-2 text-left border border-gray-300">Type</th>
          <th class="px-4 py-2 text-left border border-gray-300">Category</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="odd:bg-white even:bg-gray-50"
        >
          <td class="px-4 py-2 border border-gray-300">{{ transaction.id }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ transaction.date }}</td>
          <td class="px-4 py-2 border border-gray-300">${{ transaction.amount }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ transaction.type }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ transaction.category_id }}</td>


        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import ApiService from '../services/api.ts';
import {onMounted, ref} from "vue"; // Adjust path if necessary

const transactions = ref([]);
const loading = ref(true);

onMounted(async () => {
  await loadTransactions();
});

async function loadTransactions() {
  try {
    // Use your ApiService to fetch transactions
    transactions.value = await ApiService.getTransactions(); // Adjust based on your API response structure
  } catch (error) {
    console.error('Error loading transactions:', error);
  } finally {
    loading.value = false;
  }
}
</script>