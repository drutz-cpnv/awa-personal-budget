-- Insert sample categories
INSERT INTO
    categories (name)
VALUES ('work'),
    ('hobbies'),
    ('bills'),
    ('food'),
    ('entertainment'),
    ('savings');

-- Insert sample transactions
INSERT INTO
    transactions (
        type,
        category_id,
        amount,
        frequency,
        description,
        date
    )
VALUES (
        'income',
        1,
        2500.00,
        'monthly',
        'Monthly salary',
        '2024-12-01'
    ),
    (
        'expense',
        3,
        100.00,
        'monthly',
        'Electricity bill',
        '2024-12-05'
    ),
    (
        'expense',
        4,
        50.00,
        'one-time',
        'Dinner with friends',
        '2024-12-06'
    ),
    (
        'income',
        2,
        200.00,
        'one-time',
        'Freelance project',
        '2024-12-07'
    ),
    (
        'expense',
        5,
        15.00,
        'one-time',
        'Movie ticket',
        '2024-12-08'
    ),
    (
        'expense',
        6,
        500.00,
        'annual',
        'Savings deposit',
        '2024-12-09'
    );