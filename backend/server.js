require('dotenv').config();
const express = require('express');
const cors = require('cors');
const projectsRouter = require('./routes/projects');
const expensesRouter = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/projects', projectsRouter);
app.use('/expenses', expensesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Projects & Expenses Tracker API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
