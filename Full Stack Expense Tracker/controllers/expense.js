const express = require('express');
const Expense = require('../models/expense'); 


exports.addExpense =  async (req,res) => {
    try{
     const {amount, description, category} = req.body;
 
     const newExpense = await Expense.create({
         amount: amount,
         description: description,
         category: category
     })
 
     console.log('Successfully Saved!');
     res.status(201).json({newExpenseDetails: newExpense})
    }
    catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 }

exports.getExpense =  async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json({ allExpenses: expenses });
    } catch (error) {
        console.log('Error at getUser:', error);
        res.status(500).json({ error: error });
    }
}

exports.deleteExpense =  async (req, res) => {
    try {
        const expenseId = req.params.expenseId;
        if (isNaN(expenseId) || expenseId <= 0) {
            console.log('Invalid expense ID:', expenseId);
            return res.status(400).json({ error: 'Invalid expense ID' });
        }

        await Expense.destroy({ where: { id: expenseId } });
        res.sendStatus(200);
    } catch (error) {
        console.error('Error while deleting expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}