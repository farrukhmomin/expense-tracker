import BLLBase from "./BLLBase";

class BLLExpenses extends BLLBase {

    constructor(DB: any) {
        super(DB);
    }

    getExpense(req: any, callback: any) {
        let sql = `select * from expenses where user_id=1 order by dated;`
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

    getIgnoreTags(callback: any) {
        let sql = `select * from ignore_tags where user_id=1;`
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }

}

export = BLLExpenses;