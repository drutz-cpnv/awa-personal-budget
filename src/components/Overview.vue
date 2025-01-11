<template>
  <AreaChart :data="data" :categories="['Dépense', 'Revenus']" index="name" :rounded-corners="4"/>
</template>

<script setup lang="ts">
import {AreaChart} from '@/components/ui/chart-area'
import {onMounted, ref} from "vue";
import type {Transaction} from "@/types";
import {getMonth} from "@/services/month.ts";
import {groupDataByMonthAndType} from "@/services/formatter.ts";

const loading = ref(true);

const data = ref([])

const props = defineProps<{
  data: Transaction[];
}>();

onMounted(async () => {
  loading.value = false;
  const result = groupDataByMonthAndType(props.data);

  for (const groupedKey in result) {
    data.value.push({
      name: getMonth(Number.parseInt(groupedKey.split('-')[1], 10)),
      Dépense: result[groupedKey].expense,
      Revenus: result[groupedKey].income
    })
  }
});

function getFirstTwoWordLetters(str: string) {
  const words = str.trim().split(/\s+/);
  const firstLetter = words[0] ? words[0][0] : '';
  const secondLetter = words[1] ? words[1][0] : '';
  return (firstLetter + secondLetter).toUpperCase();
}

</script>