"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: config_1.default.mysql_params.host,
    user: config_1.default.mysql_params.user,
    password: config_1.default.mysql_params.password,
    database: config_1.default.mysql_params.database
});
connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});
