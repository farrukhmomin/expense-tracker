import BLLVendor from "../BLL/BLLVendor";
import { PResult } from "../utilities/enums";

var express = require('express');
var vendorRouter = express.Router();

vendorRouter.get('/get-vendor', function (req: any, res: any) {
    req.getConnection(function (err: any, connection: any) {
        const vendor = new BLLVendor(connection);
        vendor.getAllVendors((result: PResult) => {
            res.send(result);
        });

    });
});

vendorRouter.get('/get-vendor-expense-type', function (req: any, res: any) {
    req.getConnection(function (err: any, connection: any) {
        const vendor = new BLLVendor(connection);
        vendor.getAllVendorExpenseTypes((result: PResult) => {
            res.send(result);
        });

    });
});



export = vendorRouter;