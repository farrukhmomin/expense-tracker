import { Observable } from 'rxjs';
import BLLBase from "./BLLBase";

class BLLVendor extends BLLBase {

    constructor(DB: any) {
        super(DB);
    }

    getAllVendors(callback: any) {
        this.GetResultByQuery('select * from vendor', undefined, (result) => {
            callback(result);
        });
    }

    getAllVendorExpenseTypes(callback: any) {
        let sql = `select * from vendor_expense;`
        this.GetResultByQuery(sql, undefined, (result) => {
            callback(result);
        });
    }
}

export = BLLVendor;