<template>
  <AreaChart :data="data" :categories="['Dépense', 'Revenus']" index="name" :rounded-corners="4"/>
</template>

<script setup lang="ts">
import {AreaChart} from '@/components/ui/chart-area'

import ApiService from "@/services/api.ts";
import {onMounted, ref} from "vue";
import type {Transaction, TransactionSumByMonthAndType} from "@/types";
import {getMonth} from "@/services/month.ts";

const transactions = ref<Transaction[]>([]);
const loading = ref(true);

const data = ref([])

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
    const result = groupDataByMonthAndType(transactions.value);

    for (const groupedKey in result) {
      data.value.push({
        name: getMonth(Number.parseInt(groupedKey.split('-')[1], 10)),
        Dépense: result[groupedKey].expense,
        Revenus: result[groupedKey].income
      })
    }
  }
}

function getFirstTwoWordLetters(str: string) {
  const words = str.trim().split(/\s+/);
  const firstLetter = words[0] ? words[0][0] : '';
  const secondLetter = words[1] ? words[1][0] : '';
  return (firstLetter + secondLetter).toUpperCase();
}

function groupDataByMonthAndType(d: Transaction[]): TransactionSumByMonthAndType {

  const grouped: TransactionSumByMonthAndType = {};

  d.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  d.map(item => {
    const date = new Date(item.date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const type = item.type as "income" | "expense";
    if (!grouped[month]) {
      grouped[month] = {income: 0, expense: 0};
    }
    grouped[month][type] += item.amount;
  });

  return grouped;
}

</script>