<template>
  <div class="flex justify-center min-h-screen">
    <div class="w-full max-w-2xl p-4 space-y-4">
      <!-- Filters and Sort Options -->
      <div class="flex items-center justify-between space-x-2">
        <Tabs v-model="filterType" default-value="all" class="space-y-0">
          <TabsList class="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
          </TabsList>
        </Tabs>

        <!-- Combo Box for category filter -->
        <Popover v-model:open="categoryPopoverOpen">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="categoryPopoverOpen"
              class="w-[200px] justify-between"
            >
              {{
                selectedCategory
                  ? uniqueCategories.find((category) => category === selectedCategory)?.toUpperCase()
                  : "Select Category..."
              }}
              <ChevronsUpDown class="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command v-model="selectedCategory">
              <CommandInput placeholder="Search category..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="category in uniqueCategories"
                    :key="category"
                    :value="category"
                    @select="categoryPopoverOpen = false"
                  >
                    <Check
                      :class="cn(
                        'mr-2 h-4 w-4',
                        selectedCategory === category
                          ? 'opacity-100'
                          : 'opacity-0'
                      )"
                    />
                    {{ category }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button @click="toggleSortOrder" variant="default" class="flex items-center space-x-2">
          <span>Sort by Date</span>
          <svg v-if="sortOrder === 'asc'" class="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </div>

      <!-- Delete Selected Button -->
      <Button
        v-if="selectedTransactionIds.length > 0"
        variant="destructive"
        @click="deleteSelectedTransactions"
        class="w-full"
      >
        Delete Selected ({{ selectedTransactionIds.length }})
      </Button>

      <!-- Loading state with skeleton components -->
      <div v-if="loading">
        <div class="flex flex-col space-y-3">
          <Skeleton class="h-[125px] w-[250px] rounded-xl" />
          <div class="space-y-2">
            <Skeleton class="h-4 w-[250px]" />
            <Skeleton class="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      <!-- Filtered and Sorted List of transactions -->
      <transition-group
        name="list-transition"
        tag="div"
        class="space-y-4"
        :css="false"
        appear
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        @before-leave="beforeLeave"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
        @before-move="beforeMove"
        @move="move"
      >
        <div
          v-for="(transaction, i) in sortedAndFilteredTransactions"
          :key="transaction.id"
          class="transaction-item flex items-center p-4 bg-white rounded-lg shadow-md"
          :data-index="i"
        >
          <input
            type="checkbox"
            class="mr-4"
            :value="transaction.id"
            v-model="selectedTransactionIds"
          />
          <Avatar class="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{{ getFirstTwoWordLetters(transaction.description) }}</AvatarFallback>
          </Avatar>
          <div class="ml-4 space-y-1">
            <p class="text-sm font-medium leading-none">
              {{ transaction.description }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ transaction.category_name }}
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
      </transition-group>

      <!-- Clear Category Filter Button 
      <Button variant="outline" class="mt-4" @click="clearCategoryFilter">
        Clear Category Filter
      </Button>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import TransactionRepository from "@/repositories/TransactionRepository.ts";
import type { Transaction } from "@/types";
import { toCHF } from "@/services/formatter.ts";
import {useReload} from "@/services/hooks.ts";
import anime from "animejs";

const transactions = ref<Transaction[]>([]);
const loading = ref(true);
const filterType = ref<"all" | "income" | "expense">("all");
const selectedCategory = ref<string>("");
const sortOrder = ref<"asc" | "desc">("desc");
const categoryPopoverOpen = ref(false);
const selectedTransactionIds = ref<number[]>([]);

onMounted(async () => {
  await loadTransactions();
});

async function loadTransactions() {
  try {
    transactions.value = await TransactionRepository.findAll();
  } catch (error) {
    console.error("Error loading transactions:", error);
  } finally {
    loading.value = false;
  }
}

async function deleteSelectedTransactions() {
  try {
    for (const id of selectedTransactionIds.value) {
      await TransactionRepository.delete(id);
    }
    transactions.value = transactions.value.filter(
      (t) => !selectedTransactionIds.value.includes(t.id)
    );
    selectedTransactionIds.value = [];
    triggerReload()
  } catch (error) {
    console.error("Error deleting transactions:", error);
  }
}

function clearCategoryFilter() {
  selectedCategory.value = "";
}

const uniqueCategories = computed(() =>
  Array.from(new Set(transactions.value.map((t) => t.category_name)))
);

const sortedAndFilteredTransactions = computed(() => {
  let filtered = transactions.value;
  if (filterType.value !== "all") {
    filtered = filtered.filter((transaction) => transaction.type === filterType.value);
  }
  if (selectedCategory.value) {
    filtered = filtered.filter(
      (transaction) => transaction.category_name === selectedCategory.value
    );
  }
  return filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder.value === "asc" ? dateA - dateB : dateB - dateA;
  });
});

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
}

function getFirstTwoWordLetters(str: string) {
  const words = str.trim().split(/\s+/);
  const firstLetter = words[0] ? words[0][0] : "";
  const secondLetter = words[1] ? words[1][0] : "";
  return (firstLetter + secondLetter).toUpperCase();
}

function beforeEnter(el: HTMLElement) {
  el.style.opacity = "0";
  el.style.transform = "translateY(-40px)";

  anime({
    targets: el,
    opacity: [0, 1],
    translateY: [-40, 0],
    duration: 500,
    easing: "easeOutExpo",
    duration: 700,
    easing: "easeOutBack",
    delay: anime.stagger(50, { start: +el.dataset.index! * 90 }),
  });
}

function enter(el: HTMLElement, done: () => void) {
  const i = +el.dataset.index!;

  anime({
    targets: el,
    opacity: [0, 1],
    translateY: [-40, 0],
    duration: 500,
    easing: "easeOutExpo",
    duration: 700,
    easing: "easeOutBack",
    delay: anime.stagger(50, { start: i * 100 }),
    complete: done,
  });
}

function beforeLeave(el: HTMLElement) {
  el.style.opacity = "1";
  el.style.transform = "translateY(0)";

  anime({
    targets: el,
    opacity: [1, 0],
    translateY: [0, 40],
    duration: 400,
    easing: "easeInExpo",
    duration: 700,
    easing: "easeInBack",
    delay: anime.stagger(50, { start: +el.dataset.index! * 50 }),
  });
}

function leave(el: HTMLElement, done: () => void) {
  anime({
    targets: el,
    opacity: [1, 0],
    translateY: [0, 40],
    duration: 400,
    easing: "easeInExpo",
    duration: 700,
    easing: "easeInBack",
    complete: done,
  });
}

function afterEnter(el: HTMLElement) {
  el.style.opacity = "";
  el.style.transform = "";
}

function afterLeave(el: HTMLElement) {
  el.style.opacity = "";
  el.style.transform = "";
}

function beforeMove(el: HTMLElement) {
  const { left, top } = el.getBoundingClientRect();
  el.dataset.oldLeft = String(left);
  el.dataset.oldTop = String(top);

  anime({
    targets: el,
    opacity: [1, 0],
    duration: 400,
    easing: "easeInExpo",
    duration: 700,
    easing: "easeInBack",
    delay: anime.stagger(50, { start: +el.dataset.index! * 50 }),
  });
}

function move(el: HTMLElement, done: () => void) {
  const oldLeft = parseFloat(el.dataset.oldLeft ?? "0");
  const oldTop = parseFloat(el.dataset.oldTop ?? "0");

  const { left, top } = el.getBoundingClientRect();
  const dx = oldLeft - left;
  const dy = oldTop - top;
  const i = +el.dataset.index!;

  if (!dx && !dy) {
    return done();
  }

  anime({
    targets: el,
    translateX: [dx, 0],
    translateY: [dy, 0],
    duration: 500,
    easing: "easeOutExpo",
    duration: 700,
    easing: "easeOutBack",
    delay: anime.stagger(50, { start: i * 50 }),
    complete: done,
  });
}

const { triggerReload } = useReload()

</script>
