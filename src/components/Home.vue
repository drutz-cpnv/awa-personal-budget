<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger,} from '@/components/ui/tabs'
import Overview from '@/components/Overview.vue'
import RecentTransactions from '@/components/RecentTransactions.vue'
import {Loading} from "@/components/ui/loading";
import Transactions from "@/components/Transactions.vue";
import {Drawer, DrawerContent, DrawerTrigger,} from '@/components/ui/drawer'
import TransactionForm from "@/components/TransactionForm.vue";
import TransactionRepository from "@/repositories/TransactionRepository.ts";
import {onMounted, ref, watch} from "vue";
import type {Transaction, TransactionSumByYearAndType} from "@/types.ts";
import {useReload} from "@/services/hooks.ts";
import {groupDataByYearAndType} from "@/services/formatter.ts";
import {toCHF} from "@/services/formatter.ts";

onMounted(async () => {
  await loadData()
})

const transactions = ref<Transaction[]>()
const { needsReload, resetReload } = useReload()
const yearIncomeSum = ref()
const lastYearIncomSum = ref()
const monthIncome = ref()
const monthExpense = ref()

async function loadData() {
  transactions.value = await TransactionRepository.findAll()
  yearIncomeSum.value = groupDataByYearAndType(transactions.value)[(new Date()).getFullYear()].income
  lastYearIncomSum.value = groupDataByYearAndType(transactions.value)[(new Date()).getFullYear()-1].income
  const monthly = await TransactionRepository.findMonthlyByMonth(((new Date()).getMonth() + 1).toString())
  monthIncome.value = monthly.filter(v => v.type === 'income').reduce((a, b) => a + b.amount, 0)
  monthExpense.value = monthly.filter(v => v.type === 'expense').reduce((a, b) => a + b.amount, 0)
}


watch(needsReload, async (val) => {
  if (val) {
    await loadData();
    resetReload();
  }
})


</script>

<template>

  <div class="hidden flex-col md:flex">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">
          Dashboard
        </h2>
        <div class="flex items-center space-x-2">
          <Drawer>
            <DrawerTrigger as-child>
              <Button>Nouvelle transaction</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div class="mx-auto w-full max-w-sm py-10">
                <TransactionForm/>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <Tabs default-value="overview" class="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="transactions">
            Transactions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  Total Income {{ (new Date()).getFullYear() }}
                </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div v-if="yearIncomeSum" class="text-2xl font-bold">
                  {{ toCHF(yearIncomeSum) }}
                </div>
                <Loading v-else/>
                <p class="text-xs text-muted-foreground">
                  {{ (yearIncomeSum - lastYearIncomSum) < 0 ? '-' : '+' }} {{ Math.round((lastYearIncomSum/ yearIncomeSum) * 100) }}% from last year ({{ toCHF(lastYearIncomSum) }})
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  This month expenses
                </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M2 10h20"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold" v-if="monthExpense">
                  {{ toCHF(monthExpense) }}
                </div>
              </CardContent>
            </Card>
            <Card width="100%">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  This month income
                </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M2 10h20"/>
                  <path d="M12 2v17"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold" v-if="monthIncome">
                  {{ toCHF(monthIncome) }}
                </div>
              </CardContent>
            </Card>
          </div>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent class="pl-2">
                <Overview v-if="transactions" :data="transactions"/>
                <Loading v-else/>
              </CardContent>
            </Card>
            <Card class="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentTransactions v-if="transactions" :transactions="transactions.slice(-5)"/>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transactions" class="space-y-4">
          <Transactions/>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
