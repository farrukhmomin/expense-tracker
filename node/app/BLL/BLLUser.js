"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BLLBase_1 = __importDefault(require("./BLLBase"));
class BLLUser extends BLLBase_1.default {
    constructor(DB) {
        super(DB);
    }
    getUser(req, callback) {
        let sql = `select * from users where username='${req.body.username}' and password='${req.body.password}';`;
        this.GetResultByQuery(sql, undefined, (result) => {
            if (result.RowCount > 0) {
                req.session.userId = result.Rows[0].id;
            }
            callback(result);
        });
    }
    getMembers(req, callback) {
        let sql = `select * from members where user_id=${req.session.user_id};`;
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }
    getIncome(req, callback) {
        let sql = `select * from members where user_id=${req.session.user_id};`;
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }
}
module.exports = BLLUser;
//# sourceMappingURL=BLLUser.js.map