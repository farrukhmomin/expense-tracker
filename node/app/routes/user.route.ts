import BLLUser from "../BLL/BLLUser";
import { PResult } from "../utilities/enums";

var express = require('express');
var userRouter = express.Router();

userRouter.post('/login', function (req: any, res: any) {
    req.getConnection(function (err: any, connection: any) {
        const user = new BLLUser(connection);
        user.getUser(req, (result: PResult) => {
            res.send(result);
        });

    });
});

userRouter.get('/get-members', function (req: any, res: any) {
    req.getConnection(function (err: any, connection: any) {
        const user = new BLLUser(connection);
        user.getMembers(req, (result: PResult) => {
            res.send(result);
        });
    });
});

userRouter.get('/get-income', function (req: any, res: any) {
    req.getConnection(function (err: any, connection: any) {
        const user = new BLLUser(connection);
        user.getIncome(req, (result: PResult) => {
            res.send(result);
        });
    });
});

export = userRouter;