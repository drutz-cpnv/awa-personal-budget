-- Table for transaction categories
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE -- Category name, e.g., 'work', 'hobbies'
);

-- Table for transactions
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')), -- 'income' or 'expense'
    category_id INTEGER NOT NULL, -- Reference to the category
    amount REAL NOT NULL,
    frequency TEXT NOT NULL CHECK (
        frequency IN (
            'monthly',
            'annual',
            'one-time'
        )
    ), -- 'monthly', 'annual', 'one-time'
    description TEXT,
    date DATE DEFAULT CURRENT_DATE, -- Defaults to the current date if not provided
    FOREIGN KEY (category_id) REFERENCES categories (id) -- Ensures category consistency
);