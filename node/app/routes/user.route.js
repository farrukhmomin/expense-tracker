"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BLLUser_1 = __importDefault(require("../BLL/BLLUser"));
var express = require('express');
var userRouter = express.Router();
userRouter.post('/login', function (req, res) {
    req.getConnection(function (err, connection) {
        const user = new BLLUser_1.default(connection);
        user.getUser(req, (result) => {
            res.send(result);
        });
    });
});
userRouter.get('/get-members', function (req, res) {
    req.getConnection(function (err, connection) {
        const user = new BLLUser_1.default(connection);
        user.getMembers(req, (result) => {
            res.send(result);
        });
    });
});
userRouter.get('/get-income', function (req, res) {
    req.getConnection(function (err, connection) {
        const user = new BLLUser_1.default(connection);
        user.getIncome(req, (result) => {
            res.send(result);
        });
    });
});
module.exports = userRouter;
//# sourceMappingURL=user.route.js.map