<script setup lang="ts">
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import IncomeForm from "@/components/form/IncomeForm.vue";
import {onMounted, ref} from "vue";
import ApiService from "@/services/api.ts";
import type {Category} from "@/types.ts";
import ExpenseForm from "@/components/form/ExpenseForm.vue";

const categories = ref<Category[]>([]);
onMounted(async () => {
  categories.value = await ApiService.getCategories();
});
</script>

<template>
  <Tabs default-value="income" class="w-[400px]">
    <TabsList class="w-full">
      <TabsTrigger value="income" class="w-full">
        Income
      </TabsTrigger>
      <TabsTrigger value="expense" class="w-full">
        Expense
      </TabsTrigger>
    </TabsList>
    <TabsContent value="income">
      <IncomeForm :categories="categories"/>
    </TabsContent>
    <TabsContent value="expense">
      <ExpenseForm :categories="categories"/>
    </TabsContent>
  </Tabs>
</template>