import React from 'react';
import '../resources/analytics.css';
import { Progress, Space } from 'antd';
const Analytics = ({ transactions }) => {
    console.log(transactions);

    const totalTransactions = transactions.length;
    const totalIcomeTransactions = transactions.filter(transaction => transaction.type === 'income');
    const totalExpenseTransactions = transactions.filter(transaction => transaction.type === 'expense');
    const totalIncometransactionsPercentage = (totalIcomeTransactions.length / totalTransactions) * 100;
    const totalExpensetransactionsPercentage = (totalExpenseTransactions.length / totalTransactions) * 100;

    const totalTurnover = transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );
    const totalIncomeTurnover = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenceTurnover = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    console.log(totalExpenceTurnover);
    const totalIncomeTurnoverPercentage =
        (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenceTurnoverPercentage =
        (totalExpenceTurnover / totalTurnover) * 100;


    const categories = [
        "salary",
        "entertainment",
        "freelance",
        "food",
        "travel",
        "investment",
        "education",
        "medical",
        "tax",
    ];

    return (
        <div>
            <div className="row">
                <div className="col-md-4 mt-2">
                    <div className="transactions-count">
                        <h4>Total Transactions: {totalTransactions}</h4>
                        <hr />
                        <h5>Income: {totalIcomeTransactions.length}</h5>
                        <h5>Expense: {totalExpenseTransactions.length}</h5>

                        <div className="progress-bars">
                            <Progress strokeColor="green" type="circle" percent={totalIncometransactionsPercentage.toFixed(0)} />
                            <Progress strokeColor="red" type="circle" percent={totalExpensetransactionsPercentage.toFixed(0)} />

                        </div>
                    </div>
                </div>
                <div className="col-md-4 mt-3">
                    <div className="transactions-count">
                        <h4>Total Turn over: {totalTurnover}</h4>
                        <hr />
                        <h5>Income: {totalIncomeTurnover}</h5>
                        <h5>Expense: {totalExpenceTurnover}</h5>

                        <div className="progress-bars">
                            <Progress className='mr-1' strokeColor="green" type="circle" percent={totalIncomeTurnoverPercentage.toFixed(0)} />
                            <Progress strokeColor="red" type="circle" percent={totalExpenceTurnoverPercentage.toFixed(0)} />

                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="category-analysis">
                        <h4>Income - Category Wise</h4>
                        {categories.map((category) => {
                            const amount = transactions
                                .filter((t) => t.type == "income" && t.category === category)
                                .reduce((acc, t) => acc + t.amount, 0);
                            return (
                                amount > 0 && <div className="category-card">
                                    <h5>{category}</h5>
                                    <Progress strokeColor='#0B5AD9' percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="category-analysis">
                        <h4>Expence - Category Wise</h4>
                        {categories.map((category) => {
                            const amount = transactions
                            
                                .filter((t) => t.type == "expense" && t.category === category)
                                .reduce((acc, t) => acc + t.amount, 0);
                            return (
                                amount > 0 && <div className="category-card">
                                    <h5>{category}</h5>
                                    <Progress strokeColor='#0B5AD9' percent={((amount / totalExpenceTurnover) * 100).toFixed(0)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            </div>
            )
}

            export default Analytics;