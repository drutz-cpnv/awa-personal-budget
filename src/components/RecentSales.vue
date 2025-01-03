<template>
  <div class="space-y-8">
    <div v-if="loading">
      <div class="flex flex-col space-y-3">
        <Skeleton class="h-[125px] w-[250px] rounded-xl" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </div>
    <div class="flex items-center" v-for="transaction in transactions">
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
      <div class="ml-auto font-medium">
        {{ transaction.type === 'income' ? '+' : '-' }} {{ transaction.amount }} CHF
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Avatar, AvatarFallback, AvatarImage,} from '@/components/ui/avatar'
import ApiService from "@/services/api.ts";
import {onMounted, ref} from "vue";
import type {Transaction} from "@/types";
import { Skeleton } from '@/components/ui/skeleton'

const transactions = ref<Transaction[]>([]);
const loading = ref(true);

onMounted(async () => {
  await loadTransactions();
});

async function loadTransactions() {
  try {
    transactions.value = await ApiService.getTransactions(5);
  } catch (error) {
    console.error('Error loading transactions:', error);
  } finally {
    loading.value = false;
  }
}

function getFirstTwoWordLetters(str: string) {
  const words = str.trim().split(/\s+/);
  const firstLetter = words[0] ? words[0][0] : '';
  const secondLetter = words[1] ? words[1][0] : '';
  return (firstLetter + secondLetter).toUpperCase();
}
</script>
