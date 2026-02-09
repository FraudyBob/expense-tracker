const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/projects/:project_id/expenses', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
