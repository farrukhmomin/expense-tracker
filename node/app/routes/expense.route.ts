import BLLExpenses from "../BLL/BLLExpenses";
import { PResult } from "../utilities/enums";

var express = require('express');
var expenseRouter = express.Router();

expenseRouter.get('/get-expenses', function (req: any, res: any) {
    req.getConnection(function (err: any, connection: any) {
        const expense = new BLLExpenses(connection);
        expense.getExpense(req, (result: PResult) => {
            res.send(result);
        });
    });
});

expenseRouter.get('/get-expense-type', function (req: any, res: any) {
    req.getConnection(function (err: any, connection: any) {
        const expense = new BLLExpenses(connection);
        expense.getExpenseType((result: PResult) => {
            res.send(result);
        });
    });
});

export = expenseRouter;