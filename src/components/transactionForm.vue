<template>
  <div class="transaction-form">
    <h1>{{ isIncome ? "Income Form" : "Expense Form" }}</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Transaction Type</label>
        <div class="transaction-type">
          <label>
            <input
                type="radio"
                value="income"
                v-model="transaction.type"
            />
            Income
          </label>
          <label>
            <input
                type="radio"
                value="expense"
                v-model="transaction.type"
            />
            Expense
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="transaction-type">Transaction Category</label>
        <select
            id="transaction-type"
            v-model="transaction.category"
            required
        >
          <option value="" disabled>Select Category</option>
          <option value="spontaneous">Spontaneous</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div class="form-group">
        <label for="amount">Amount</label>
        <input
            type="number"
            id="amount"
            v-model.number="transaction.amount"
            placeholder="Enter amount"
            required
            min="0"
            step="0.01"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
            type="text"
            id="description"
            v-model="transaction.description"
            placeholder="Optional description"
        />
      </div>
      <button type="submit">
        Add {{ isIncome ? "Income" : "Expense" }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transaction: {
        type: "income", // Default type
        category: "",
        amount: null,
        description: "",
      },
    };
  },
  computed: {
    isIncome() {
      return this.transaction.type === "income";
    },
  },
  methods: {
    submitForm() {
      if (!this.transaction.type || !this.transaction.category || this.transaction.amount <= 0) {
        alert("Please complete all required fields with valid information.");
        return;
      }
      // Simulating saving transaction data
      console.log("Transaction data:", this.transaction);

      // Reset the form
      this.transaction = { type: "income", category: "", amount: null, description: "" };
      alert(`${this.isIncome ? "Income" : "Expense"} added successfully!`);
    },
  },
};
</script>

<style scoped>
.transaction-form {
  min-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #444;
}

.transaction-type {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

input[type="radio"] {
  margin-right: 0.5rem;
  accent-color: #007bff; /* Updated for modern browsers */
}

input[type="radio"]:checked + span {
  font-weight: bold;
}

input,
select {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fefefe;
  color: #333;
}

input::placeholder {
  color: #888;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

button:hover {
  background: #218838;
}

button:active {
  background: #1e7e34;
}
</style>
