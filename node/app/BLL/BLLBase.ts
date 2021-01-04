import DAL from "../DAL/dal";
import { PResult, Status } from "../utilities/enums";
import { transformObjectToArray } from './../utilities/functions';

class BLLBase {
    DBConnection: any;
    constructor(DB: any) { this.DBConnection = DB; }

    GetResultByQuery(sql: string, params: any, callback: (result: any) => any) {
        var database = new DAL(this.DBConnection);
        var self = this;

        database.GetResultByQuery(sql, params, function (err, result) {
            if (callback) {
                callback(transformObjectToArray(result));
            }
            return;
        });
    }

    MakePResult(err: any, rows: any): PResult {
        var result = new PResult(err.length == 0 ? Status.Success : Status.Failed, err);
        result.Error = err;
        result.RowCount = (err.length == 0) ? rows.length : 0;
        result.Rows = rows;
        result.InsertedId = (rows) ? (rows.insertId || undefined) : undefined;
        result.RowsAffected = (rows) ? (rows.affectedRows || undefined) : undefined;
        result.ChangedRows = (rows) ? (rows.changedRows || undefined) : undefined;
        return result;
    }

}

export = BLLBase;