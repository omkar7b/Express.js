const express = require('express');
const router = express.Router();

const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');

router.post('/add-expense', addExpense);
router.get('/get-expense', getExpense);
router.delete('/delete-expense/:expenseId', deleteExpense);

module.exports = router;
