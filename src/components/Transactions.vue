<template>
    <div class="max-w-4xl mx-auto p-5">
      <h1 class="text-2xl font-bold mb-5">Transaction List</h1>
      <!-- Show loading state -->
      <div v-if="loading" class="text-center py-5">Loading...</div>
      <!-- Show table when data is loaded -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full table-auto border-collapse border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Amount</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in transactions"
              :key="transaction.id"
              class="odd:bg-white even:bg-gray-50"
            >
              <td class="border border-gray-300 px-4 py-2">{{ transaction.id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ transaction.date }}</td>
              <td class="border border-gray-300 px-4 py-2">${{ transaction.amount }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <span
                  class="px-3 py-1 rounded"
                  :class="{
                    'bg-green-100 text-green-700': transaction.status === 'Success',
                    'bg-red-100 text-red-700': transaction.status === 'Failed'
                  }"
                >
                  {{ transaction.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  