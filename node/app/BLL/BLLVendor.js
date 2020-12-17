"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BLLBase_1 = __importDefault(require("./BLLBase"));
class BLLVendor extends BLLBase_1.default {
    constructor(DB) {
        super(DB);
    }
    getAllVendors(callback) {
        this.GetResultByQuery('select * from vendor', undefined, (result) => {
            callback(result);
        });
    }
    getAllVendorExpenseTypes(callback) {
        let sql = `select * from vendor_expense;`;
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }
}
module.exports = BLLVendor;
//# sourceMappingURL=BLLVendor.js.map