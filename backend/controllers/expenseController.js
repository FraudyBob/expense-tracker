const db = require('../db/queries');

const createExpense = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { description, amount, category } = req.body;

    if (!description || !amount || !category) {
      return res.status(400).json({ 
        error: 'Missing required fields: description, amount, category' 
      });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ 
        error: 'Amount must be a positive number' 
      });
    }

    if (!['material', 'labor', 'other'].includes(category)) {
      return res.status(400).json({ 
        error: 'Category must be one of: material, labor, other' 
      });
    }

    if (isNaN(project_id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const expense = await db.createExpense(
      parseInt(project_id), 
      description, 
      parseFloat(amount), 
      category
    );
    
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    if (error.code === '23503') {
      res.status(400).json({ error: 'Project not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category } = req.body;

    if (!description || !amount || !category) {
      return res.status(400).json({ 
        error: 'Missing required fields: description, amount, category' 
      });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ 
        error: 'Amount must be a positive number' 
      });
    }

    if (!['material', 'labor', 'other'].includes(category)) {
      return res.status(400).json({ 
        error: 'Category must be one of: material, labor, other' 
      });
    }

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid expense ID' });
    }

    const expense = await db.updateExpense(
      parseInt(id), 
      description, 
      parseFloat(amount), 
      category
    );
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json(expense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid expense ID' });
    }

    const expense = await db.deleteExpense(parseInt(id));
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense
};
