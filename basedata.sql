-- Insert sample categories
INSERT INTO categories (name)
VALUES ('Work'),
       ('Hobbies'),
       ('Bills'),
       ('Food'),
       ('Entertainment'),
       ('Savings');

-- Insert sample transactions
INSERT INTO transactions (type,
                          category_id,
                          amount,
                          frequency,
                          description,
                          date)
VALUES -- January transactions
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
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-03-25'),

        -- April transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-04-01'),
       ('expense', 3, 120.00, 'monthly', 'Electricity bill', '2024-04-05'),
       ('expense', 4, 90.00, 'one-time', 'Easter groceries', '2024-04-10'),
       ('income', 2, 200.00, 'one-time', 'Freelance design', '2024-04-15'),
       ('expense', 5, 35.00, 'one-time', 'Movie night', '2024-04-18'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-04-25'),

       -- May transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-05-01'),
       ('expense', 3, 125.00, 'monthly', 'Electricity bill', '2024-05-05'),
       ('expense', 4, 85.00, 'one-time', 'BBQ party supplies', '2024-05-15'),
       ('income', 2, 300.00, 'one-time', 'Photography gig', '2024-05-20'),
       ('expense', 5, 40.00, 'one-time', 'Concert ticket', '2024-05-25'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-05-30'),

       -- June transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-06-01'),
       ('expense', 3, 130.00, 'monthly', 'Electricity bill', '2024-06-05'),
       ('expense', 4, 75.00, 'one-time', 'Picnic supplies', '2024-06-12'),
       ('income', 2, 250.00, 'one-time', 'Consulting service', '2024-06-20'),
       ('expense', 5, 50.00, 'one-time', 'Amusement park ticket', '2024-06-25'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-06-30'),

       -- July transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-07-01'),
       ('expense', 3, 135.00, 'monthly', 'Electricity bill', '2024-07-05'),
       ('expense', 4, 100.00, 'one-time', 'Summer groceries', '2024-07-10'),
       ('income', 2, 400.00, 'one-time', 'Freelance coding', '2024-07-15'),
       ('expense', 5, 60.00, 'one-time', 'Music festival', '2024-07-20'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-07-25'),

       -- August transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-08-01'),
       ('expense', 3, 140.00, 'monthly', 'Electricity bill', '2024-08-05'),
       ('expense', 4, 110.00, 'one-time', 'Back-to-school shopping', '2024-08-15'),
       ('income', 2, 300.00, 'one-time', 'Freelance tutoring', '2024-08-20'),
       ('expense', 5, 45.00, 'one-time', 'Day trip fuel', '2024-08-25'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-08-30'),

       -- September transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-09-01'),
       ('expense', 3, 145.00, 'monthly', 'Electricity bill', '2024-09-05'),
       ('expense', 4, 90.00, 'one-time', 'Weekend groceries', '2024-09-10'),
       ('income', 2, 250.00, 'one-time', 'Freelance editing', '2024-09-15'),
       ('expense', 5, 30.00, 'one-time', 'Theater performance', '2024-09-20'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-09-25'),

       -- October transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-10-01'),
       ('expense', 3, 150.00, 'monthly', 'Electricity bill', '2024-10-05'),
       ('expense', 4, 120.00, 'one-time', 'Halloween party supplies', '2024-10-20'),
       ('income', 2, 350.00, 'one-time', 'Freelance marketing', '2024-10-25'),
       ('expense', 5, 55.00, 'one-time', 'Comedy show ticket', '2024-10-30'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-10-31'),

       -- November transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-11-01'),
       ('expense', 3, 160.00, 'monthly', 'Electricity bill', '2024-11-05'),
       ('expense', 4, 140.00, 'one-time', 'Thanksgiving dinner', '2024-11-25'),
       ('income', 2, 200.00, 'one-time', 'Freelance voiceover', '2024-11-28'),
       ('expense', 5, 25.00, 'one-time', 'Movie ticket', '2024-11-30'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-11-30'),

       -- December transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2024-12-01'),
       ('expense', 3, 170.00, 'monthly', 'Electricity bill', '2024-12-05'),
       ('expense', 4, 200.00, 'one-time', 'Christmas shopping', '2024-12-20'),
       ('income', 2, 400.00, 'one-time', 'Holiday event hosting', '2024-12-25'),
       ('expense', 5, 75.00, 'one-time', 'New Year’s Eve party', '2024-12-31'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2024-12-31'),

       -- January 2025 transactions
       ('income', 1, 2500.00, 'monthly', 'Monthly salary', '2025-01-01'),
       ('expense', 3, 180.00, 'monthly', 'Electricity bill', '2025-01-05'),
       ('expense', 4, 80.00, 'one-time', 'Winter groceries', '2025-01-10'),
       ('income', 2, 300.00, 'one-time', 'Freelance blogging', '2025-01-15'),
       ('expense', 5, 20.00, 'one-time', 'Ice skating ticket', '2025-01-18'),
       ('expense', 6, 500.00, 'annual', 'Savings deposit', '2025-01-20');