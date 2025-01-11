<script setup lang="ts">

import {Input} from "@/components/ui/input";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import type {Category, Transaction} from "@/types.ts";
import TransactionRepository from "@/repositories/TransactionRepository.ts";
import { Textarea } from '@/components/ui/textarea'



const formSchema = toTypedSchema(z.object({
  amount: z.number().positive(),
  description: z.string().min(3),
  type: z.enum(['income', 'expense']).default('expense').readonly(),
  frequency: z.enum(['monthly', 'annual', 'one-time']),
  category_id: z.string(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(v => {
  const values = {...v}
  values.type = 'expense'
  console.log(values)
  TransactionRepository.create(values)
})

/*const onSubmit = async (e: Event) => {
  e.preventDefault()
  form.submitForm(e)
  console.log(form.values)
  const values = {...form.values}
  values.type = 'income'
  console.log(values)

  await ApiService.createTransaction(values)
}*/



const props = defineProps<{
  categories: Category[]
}>()

</script>

<template>
  <Card>
    <form @submit="onSubmit">
      <CardHeader>
        <CardTitle>Expense</CardTitle>
        <CardDescription>
          Create an expense transaction.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <FormField v-slot="{ componentField }" name="amount">
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField"/>
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea v-bind="componentField"/>
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="frequency">
          <FormItem>
            <FormLabel>Frequency</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select a frequency"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">
                    Monthly
                  </SelectItem>
                  <SelectItem value="annual">
                    Annually
                  </SelectItem>
                  <SelectItem value="one-time">
                    Spontaneous
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="category_id">
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select a category"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                      value="placeholder"
                      disabled
                  >
                    Select Category
                  </SelectItem>
                  <SelectItem
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id.toString()"
                  >
                    {{ category.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter>
        <Button type="submit">
          Submit
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>