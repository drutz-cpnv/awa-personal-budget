-- Insert sample categories
INSERT INTO categories (name)
VALUES ('work'),
       ('hobbies'),
       ('bills'),
       ('food'),
       ('entertainment'),
       ('savings');

-- Insert sample transactions
INSERT INTO transactions (type,
                          category_id,
                          amount,
                          frequency,
                          description,
                          date)
VALUES  -- January transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-01-01'),
       ('expense', 3, 120.00, 'monthly', 'Electricity bill', '2024-01-05'),
       ('expense', 4, 60.00, 'one-time', 'Groceries', '2024-01-10'),
       ('income', 2, 150.00, 'one-time', 'Online course sale', '2024-01-15'),
       ('expense', 5, 20.00, 'one-time', 'Concert ticket', '2024-01-18'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-01-20'),

       -- February transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-02-01'),
       ('expense', 3, 110.00, 'monthly', 'Electricity bill', '2024-02-05'),
       ('expense', 4, 70.00, 'one-time', 'Valentines Day dinner', '2024-02-14'),
       ('income', 2, 300.00, 'one-time', 'Freelance writing', '2024-02-20'),
       ('expense', 5, 25.00, 'one-time', 'Museum visit', '2024-02-22'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-02-28'),

       -- March transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-03-01'),
       ('expense', 3, 115.00, 'monthly', 'Electricity bill', '2024-03-05'),
       ('expense', 4, 80.00, 'one-time', 'Family dinner', '2024-03-10'),
       ('income', 2, 250.00, 'one-time', 'Consulting fee', '2024-03-15'),
       ('expense', 5, 30.00, 'one-time', 'Theater ticket', '2024-03-20'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-03-25');