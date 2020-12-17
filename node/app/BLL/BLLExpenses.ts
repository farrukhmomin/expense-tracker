import BLLBase from "./BLLBase";

class BLLExpenses extends BLLBase {

    constructor(DB: any) {
        super(DB);
    }

    getExpense(req: any, callback: any) {
        let sql = `select * from expenses where user_id='${req.session.user_id}';`
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }

    getExpenseType(callback: any) {
        let sql = `select * from expense_type;`
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }
}

export = BLLExpenses;