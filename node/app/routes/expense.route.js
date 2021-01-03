"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BLLExpenses_1 = __importDefault(require("../BLL/BLLExpenses"));
var express = require('express');
var expenseRouter = express.Router();
expenseRouter.get('/get-expenses', function (req, res) {
    req.getConnection(function (err, connection) {
        const expense = new BLLExpenses_1.default(connection);
        expense.getExpense(req, (result) => {
            res.send(result);
        });
    });
});
expenseRouter.get('/get-expense-type', function (req, res) {
    req.getConnection(function (err, connection) {
        const expense = new BLLExpenses_1.default(connection);
        expense.getExpenseType((result) => {
            res.send(result);
        });
    });
});
expenseRouter.get('/get-ignore-tags', function (req, res) {
    req.getConnection(function (err, connection) {
        const expense = new BLLExpenses_1.default(connection);
        expense.getIgnoreTags((result) => {
            res.send(result);
        });
    });
});
module.exports = expenseRouter;
//# sourceMappingURL=expense.route.js.map