<template>
  <div class="flex justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-2xl p-4 space-y-4">
      <!-- Filters and Sort Options -->
      <div class="flex items-center justify-between space-x-2">
        <!-- Tabs for filtering by type -->
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

        <!-- Sort by Date -->
        <Button
          @click="toggleSortOrder"
          variant="default"
          class="flex items-center space-x-2"
        >
          <span>Sort by Date</span>
          <svg
            v-if="sortOrder === 'asc'"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 transform rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </div>

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
        tag="div"
        class="space-y-4"
        appear
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
      <div
        v-for="(transaction, index) in sortedAndFilteredTransactions"
        :key="transaction.id"
        :data-index="index"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import {Tabs,TabsList,TabsTrigger,} from "@/components/ui/tabs";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import {Command,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList,} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import TransactionRepository from "@/repositories/TransactionRepository.ts";
import type { Transaction } from "@/types";
import { toCHF } from "@/services/formatter.ts";

function beforeEnter(el: HTMLElement) {
  // Use the index to decide initial transform (left or right).
  const index = Number(el.dataset.index) || 0

  // If even: come from the left; if odd: come from the right.
  if (index % 2 === 0) {
    el.style.transform = "translateX(-50px)"
  } else {
    el.style.transform = "translateX(50px)"
  }

  el.style.opacity = "0"
}

function enter(el: HTMLElement, done: () => void) {
  const index = Number(el.dataset.index) || 0

  // Stagger by index, e.g. 80ms per item
  const delay = index * 80

  setTimeout(() => {
    // Start the transition
    el.style.transition = "all 0.4s ease"
    el.style.transform = "translateX(0)"
    el.style.opacity = "1"

    // When the transition ends, call done() to tell Vue it’s finished
    el.addEventListener("transitionend", function handler() {
      el.removeEventListener("transitionend", handler)
      done()
    })
  }, delay)
}

function leave(el: HTMLElement, done: () => void) {
  // This is optional if you also want a staggered or directional leave
  el.style.transition = "all 0.4s ease"
  el.style.transform = "translateX(-50px)"
  el.style.opacity = "0"

  el.addEventListener("transitionend", function handler() {
    el.removeEventListener("transitionend", handler)
    done()
  })
}


// State variables
const transactions = ref<Transaction[]>([]);
const loading = ref(true);
const filterType = ref<"all" | "income" | "expense">("all");
const selectedCategory = ref<string>("");
const sortOrder = ref<"asc" | "desc">("desc");
const categoryPopoverOpen = ref(false);

// Fetch transactions
onMounted(async () => {
  await loadTransactions();
});

async function loadTransactions() {
  try {
    transactions.value = await TransactionRepository.findAll()
  } catch (error) {
    console.error("Error loading transactions:", error);
  } finally {
    loading.value = false;
  }
}

// Computed values
const uniqueCategories = computed(() =>
  Array.from(new Set(transactions.value.map((t) => t.category_name)))
);

const sortedAndFilteredTransactions = computed(() => {
  let filtered = transactions.value;

  if (filterType.value !== "all") {
    filtered = filtered.filter(
      (transaction) => transaction.type === filterType.value
    );
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

// Helper methods
function toggleSortOrder() {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
}

function getFirstTwoWordLetters(str: string) {
  const words = str.trim().split(/\s+/);
  const firstLetter = words[0] ? words[0][0] : "";
  const secondLetter = words[1] ? words[1][0] : "";
  return (firstLetter + secondLetter).toUpperCase();
}
</script>
