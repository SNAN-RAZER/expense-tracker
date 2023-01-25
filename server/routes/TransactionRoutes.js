const transactionModel = require("../models/transactionModel");
const { userModel } = require("../models/userModel");
const moment = require('moment');

const addTransaction = async (req, res) => {
    const {
        id

    } = req.body;
    console.log(id)
    const user = await userModel.findOne({ _id: id });
    if (!user) {
        return res.status(404).send({ message: "user not found", sucess: false });
    }
    const transaction = new transactionModel({
        ...req.body
    });
    await transaction.save();
    console.log(transaction);
    return res.status(201).send({ message: "Transaction added sucessfully", sucess: true });

};


const editTransaction = async (req, res) => {
    
    try {
        console.log()
        const data= await transactionModel.findByIdAndUpdate({_id:req.body.transactionId},req.body.payload);
        console.log("update");
        console.log(data);
        return res.status(200).send("Transaction updated sucessfully");
    } catch (error) {
        res.status(500).json(error);
    }

};
const deleteTransaction = async (req, res) => {
    
    try {console.log("delete");
        console.log(req.body.transactionId);
        const data= await transactionModel.findOneAndDelete({_id:req.body.transactionId});
        console.log("delete");
        console.log(data);
        return res.status(200).send("Transaction deleted sucessfully");
    } catch (error) {
        res.status(500).json(error);
    }

};


const getTransactions = async (req, res) => {

    const { id,
        frequency,
        selectedRange,
        type
    } = req.body;
    console.log(frequency);
    const trasactions = await transactionModel.find({

        ...(frequency !== 'custom'
            ? {
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate(),
                }
            }
            :
            {
                date: {
                    $gte: selectedRange[0],
                    $lte: selectedRange[1],
                }
            }),

        id,
        ...(type!=='all' && {type})
});
if (!trasactions) {
    return res.status(404).send({ message: "transaction not found", sucess: false });
}
console.log(trasactions);
return res.status(200).send({ message: "Transactions found", sucess: true, trasactions });
}

module.exports = {
    addTransaction,
    getTransactions,
    editTransaction,
    deleteTransaction
}