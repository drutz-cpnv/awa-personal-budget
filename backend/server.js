const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database('../pb.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Define a route to get all categories
app.get('/api/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Define a route to get all transactions
app.get('/api/transactions', (req, res) => {
  let sql = 'SELECT * FROM transactions';
  const params = []
  if (req.query.count) {
    sql += ' LIMIT ?'
    params.push(req.query.count)
  }
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Define a route to get a single transaction by id
app.get('/api/transactions/:id', (req, res) => {
  const sql = 'SELECT * FROM transactions WHERE id = ?';
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// Define a route to get all transactions for a specific category
app.get('/api/categories/:categoryId/transactions', (req, res) => {
  const sql = 'SELECT * FROM transactions WHERE category_id = ?';
  const params = [req.params.categoryId];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Define a route to create a new transaction
app.post('/api/transactions', (req, res) => {
  const { type, category_id, amount, frequency, description, date } = req.body;
  const sql = 'INSERT INTO transactions (type, category_id, amount, frequency, description, date) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [type, category_id, amount, frequency, description, date];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: { id: this.lastID } });
  });
});

// Define a route to update a transaction by id
app.put('/api/transactions/:id', (req, res) => {
  const { type, category_id, amount, frequency, description, date } = req.body;
  const sql = 'UPDATE transactions SET type = ?, category_id = ?, amount = ?, frequency = ?, description = ?, date = ? WHERE id = ?';
  const params = [type, category_id, amount, frequency, description, date, req.params.id];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: { changes: this.changes } });
  });
});

// Define a route to delete a transaction by id
app.delete('/api/transactions/:id', (req, res) => {
  const sql = 'DELETE FROM transactions WHERE id = ?';
  const params = [req.params.id];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: { changes: this.changes } });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});