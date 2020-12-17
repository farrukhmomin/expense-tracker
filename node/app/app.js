"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const expenseRouter = require("./routes/expense.route");
const userRouter = require("./routes/user.route");
const vendorRouter = require("./routes/vendor.route");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var app = express();
var session = require('express-session');
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(logger('dev'));
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ resave: true, saveUninitialized: true, secret: 'GFT^*&IUGFT&R^*IUG', cookie: { maxAge: 60000 } }));
app.use(myConnection(mysql, config_1.default.mysql_params, 'single'));
app.use('/vendor', vendorRouter);
app.use('/user', userRouter);
app.use('/expense', expenseRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var server = app.listen(config_1.default.api_port, function () {
    var host = 'localhost'; //server.address().address
    var port = server.address().port;
    console.log('Mighty Peanut listening at http://%s:%s', host, port);
});
//# sourceMappingURL=app.js.map