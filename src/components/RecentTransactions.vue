<template>
  <div class="space-y-8">
    <div class="flex items-center" v-for="transaction in props.transactions">
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
        {{ transaction.type === 'income' ? '+' : '-' }} {{ toCHF(transaction.amount) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Avatar, AvatarFallback, AvatarImage,} from '@/components/ui/avatar'
import {onMounted, ref} from "vue";
import type {Transaction} from "@/types";
import { Skeleton } from '@/components/ui/skeleton'
import { toCHF } from "@/services/formatter.ts";


const props = defineProps<{
  transactions: Transaction[]
}>()

function getFirstTwoWordLetters(str: string) {
  const words = str.trim().split(/\s+/);
  const firstLetter = words[0] ? words[0][0] : '';
  const secondLetter = words[1] ? words[1][0] : '';
  return (firstLetter + secondLetter).toUpperCase();
}
</script>
