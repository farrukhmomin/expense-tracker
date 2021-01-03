"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BLLBase_1 = __importDefault(require("./BLLBase"));
class BLLExpenses extends BLLBase_1.default {
    constructor(DB) {
        super(DB);
    }
    getExpense(req, callback) {
        let sql = `select * from expenses where user_id=1 order by dated;`;
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }
    getExpenseType(callback) {
        let sql = `select * from expense_type;`;
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }
    getIgnoreTags(callback) {
        let sql = `select * from ignore_tags where user_id=1;`;
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }
}
module.exports = BLLExpenses;
//# sourceMappingURL=BLLExpenses.js.map