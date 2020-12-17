import BLLBase from "./BLLBase";

class BLLUser extends BLLBase {

    constructor(DB: any) {
        super(DB);
    }

    getUser(req: any, callback: any) {
        let sql = `select * from users where username='${req.body.username}' and password='${req.body.password}';`
        this.GetResultByQuery(sql, undefined, (result) => {
            if (result.RowCount > 0) {
                req.session.userId = result.Rows[0].id;
            }
            callback(result);
        });
    }

    getMembers(req: any, callback: any) {
        let sql = `select * from members where user_id=${req.session.user_id};`
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }

    getIncome(req: any, callback: any) {
        let sql = `select * from members where user_id=${req.session.user_id};`
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }

}

export = BLLUser;