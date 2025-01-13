import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Budgets from '../components/Budgets.vue'
import Income from '../components/Income.vue'
import Expenses from '../components/Expenses.vue'
import Transactions from '../components/Transactions.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/budgets',
            name: 'budgets',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Budgets
        },
        {
            path: '/income',
            name: 'income',
            component: Income
        },

        {
            path: '/expenses',
            name: 'expenses',
            component: Expenses
        },
        {
            path: '/Transactions',
            name: 'transactions',
            component: Transactions
        }
    ],
})

export default router
