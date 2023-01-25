const express = require('express');
const { addTransaction, getTransactions, editTransaction, deleteTransaction} = require('../routes/TransactionRoutes');
const transactionRouter = express.Router();

transactionRouter.post("/addtransaction", addTransaction);
transactionRouter.put("/edittransaction", editTransaction);
transactionRouter.post("/gettransactions", getTransactions);
transactionRouter.post("/deletetransaction",deleteTransaction);
module.exports={
    transactionRouter
}