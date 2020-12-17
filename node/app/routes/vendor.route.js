"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BLLVendor_1 = __importDefault(require("../BLL/BLLVendor"));
var express = require('express');
var vendorRouter = express.Router();
vendorRouter.get('/get-vendor', function (req, res) {
    req.getConnection(function (err, connection) {
        const vendor = new BLLVendor_1.default(connection);
        vendor.getAllVendors((result) => {
            res.send(result);
        });
    });
});
vendorRouter.get('/get-vendor-expense-type', function (req, res) {
    req.getConnection(function (err, connection) {
        const vendor = new BLLVendor_1.default(connection);
        vendor.getAllVendorExpenseTypes((result) => {
            res.send(result);
        });
    });
});
module.exports = vendorRouter;
//# sourceMappingURL=vendor.route.js.map