import BLLBase from "./BLLBase";

class BLLUser extends BLLBase {

    constructor(DB: any) {
        super(DB);
    }

    getUser(req: any, callback: any) {
        let sql = `select * from users where username='${req.body.username}' and password='${req.body.password}'`;
        this.GetResultByQuery(sql, undefined, (result) => {
            if (result[0].id) {
                req.session.userId = result[0].id;
                console.log(req);
            }
            callback(result);
        });
    }

    getMembers(req: any, callback: any) {
        let sql = `select * from members where user_id=1`
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }

    getIncome(req: any, callback: any) {
        let sql = `select * from income where user_id=1 order by dated`
        console.log(sql);
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }

}

export = BLLUser;