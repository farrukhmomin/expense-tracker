"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dal_1 = __importDefault(require("../DAL/dal"));
const enums_1 = require("../utilities/enums");
class BLLBase {
    constructor(DB) { this.DBConnection = DB; }
    GetResultByQuery(sql, params, callback) {
        var database = new dal_1.default(this.DBConnection);
        var self = this;
        database.GetResultByQuery(sql, params, function (err, result) {
            if (callback) {
                callback(self.MakePResult(err, result));
            }
            return;
        });
    }
    MakePResult(err, rows) {
        var result = new enums_1.PResult(err.length == 0 ? enums_1.Status.Success : enums_1.Status.Failed, err);
        result.Error = err;
        result.RowCount = (err.length == 0) ? rows.length : 0;
        result.Rows = rows;
        result.InsertedId = (rows) ? (rows.insertId || undefined) : undefined;
        result.RowsAffected = (rows) ? (rows.affectedRows || undefined) : undefined;
        result.ChangedRows = (rows) ? (rows.changedRows || undefined) : undefined;
        return result;
    }
}
module.exports = BLLBase;
//# sourceMappingURL=BLLBas.js.map