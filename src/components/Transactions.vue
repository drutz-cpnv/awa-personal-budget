<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-2xl">
      <!-- Tabs for filtering -->
      <Tabs v-model="filterType" default-value="all" class="space-y-0">
        <TabsList class="grid w-full grid-cols-3">
          <TabsTrigger value="all">
            All
          </TabsTrigger>
          <TabsTrigger value="income">
            Income
          </TabsTrigger>
          <TabsTrigger value="expense">
            Expense
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <!-- Loading state with skeleton components -->
      <div v-if="loading" class="mt-4 space-y-4">
        <div class="flex flex-col space-y-3">
          <Skeleton class="h-[125px] w-[250px] rounded-xl" />
          <div class="space-y-2">
            <Skeleton class="h-4 w-[250px]" />
            <Skeleton class="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      <!-- Filtered List of transactions -->
      <div v-else class="mt-4 space-y-4">
        <div
          v-for="transaction in filteredTransactions"
          :key="transaction.id"
          class="flex items-center p-4 bg-white rounded-lg shadow-md"
        >
          <Avatar class="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{{ getFirstTwoWordLetters(transaction.description) }}</AvatarFallback>
          </Avatar>
          <div class="ml-4 space-y-1">
            <p class="text-sm font-medium leading-none">
              {{ transaction.description }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ new Date(transaction.date).toLocaleDateString() }}
            </p>
          </div>
          <div
            class="ml-auto font-medium"
            :class="transaction.type === 'income' ? 'text-green-500' : 'text-red-500'"
          >
            {{ transaction.type === 'income' ? '+' : '-' }} {{ toCHF(transaction.amount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Importing Tab components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import ApiService from "@/services/api.ts";
import { onMounted, ref, computed } from "vue";
import type { Transaction } from "@/types";
import { toCHF } from "@/services/formatter.ts";

const transactions = ref<Transaction[]>([]);
const loading = ref(true);
const filterType = ref<'all' | 'income' | 'expense'>('all'); // Filter state

onMounted(async () => {
  await loadTransactions();
});

async function loadTransactions() {
  try {
    transactions.value = await ApiService.getTransactions(); // Fetching 5 transactions
  } catch (error) {
    console.error("Error loading transactions:", error);
  } finally {
    loading.value = false;
  }
}

function getFirstTwoWordLetters(str: string) {
  const words = str.trim().split(/\s+/);
  const firstLetter = words[0] ? words[0][0] : "";
  const secondLetter = words[1] ? words[1][0] : "";
  return (firstLetter + secondLetter).toUpperCase();
}

// Computed property to filter transactions based on the filterType
const filteredTransactions = computed(() => {
  if (filterType.value === 'all') {
    return transactions.value;
  }
  return transactions.value.filter((transaction) => transaction.type === filterType.value);
});
</script>
