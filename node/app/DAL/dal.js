"use strict";
class DAL {
    constructor(SingleTonDbConnection) {
        this.Connection = SingleTonDbConnection;
    }
    Insert(sql, parameters, callback, caller) {
        //console.log(sql);
        this.Connection.query(sql, parameters, function (err, result) {
            var arrError = [];
            if (err) {
                arrError.push(err.message);
                console.log(err);
            }
            //raise the callback 
            if (callback) {
                //calling a callback function
                if (caller == undefined) {
                    callback(arrError, result);
                    return;
                }
                else {
                    callback.call(caller, arrError, result);
                    return;
                }
            }
        });
        return;
    }
    Delete(sql, parameters, callback, caller) {
        //console.log(sql);
        this.Connection.query(sql, parameters, function (err, result) {
            var arrError = [];
            if (err) {
                arrError.push(err.message);
                console.log(err);
            }
            //query to database
            //raise the callback 
            if (callback) {
                //calling a callback function
                if (caller == undefined) {
                    callback(arrError, result);
                    return;
                }
                else {
                    callback.call(caller, arrError, result);
                    return;
                }
            }
        });
        return;
    }
    Update(sql, parameters, condition, callback, caller) {
        //console.log(sql);
        var updateParameters = [];
        updateParameters.push(parameters);
        var condition = condition;
        if (condition && condition.length > 0) {
            sql = sql + " where ";
            for (var x = 0; x < condition.length; x++) {
                //parameters.push(condition[x].Column);
                updateParameters.push(condition[x].Value);
                sql = sql + condition[x].Column + (condition[x].Operator || "=") + ' ?';
                if (condition.length > 1 && x < condition.length - 1) {
                    sql = sql + " and ";
                }
            }
        }
        var options = {
            sql: sql,
            typeCast: function (field, next) {
                if (field.type == 'BIT' && field.length == 1) {
                    return (field.string() == '1'); // 1 = true, 0 = false
                }
                return next();
            }
        };
        this.Connection.query(options, updateParameters, function (err, result) {
            var arrError = [];
            if (err) {
                arrError.push(err.message);
                console.log(err);
            }
            //raise the callback 
            if (callback) {
                //calling a callback function
                if (caller == undefined) {
                    callback(arrError, result);
                    return;
                }
                else {
                    callback.call(caller, arrError, result);
                    return;
                }
            }
        });
    }
    UpdateByQuery(sql, parameters, callback, caller) {
        //console.log(sql);
        this.Connection.query(sql, parameters, function (err, result) {
            var arrError = [];
            if (err) {
                arrError.push(err.message);
                console.log(err);
            }
            //raise the callback 
            if (callback) {
                //calling a callback function
                if (caller == undefined) {
                    callback(arrError, result);
                    return;
                }
                else {
                    callback.call(caller, arrError, result);
                    return;
                }
            }
        });
    }
    Query(parameters, callback, caller) {
        let columnsToSelect = (parameters.Select.length != 0) ? parameters.Select : ['*'];
        let where = parameters.Where;
        let groupBy = (parameters.GroupBy) ? this.Connection.escape(parameters.GroupBy) : '';
        let having = (parameters.Having) ? this.Connection.escape(parameters.Having) : '';
        let orderBy = (parameters.OrderBy) ? this.Connection.escape(parameters.OrderBy) : '';
        let innerJoin = (parameters.InnerJoin) ? this.Connection.escape(parameters.InnerJoin) : '';
        let sql = 'SELECT ?? FROM ?? ';
        let dbParams = [columnsToSelect, parameters.TableName];
        if (innerJoin != "") {
            sql += innerJoin.substring(1, innerJoin.length - 1);
        }
        if (where && where.length > 0) {
            sql = sql + " where ";
            for (var x = 0; x < where.length; x++) {
                dbParams.push(where[x].Column);
                dbParams.push(where[x].Value);
                sql = sql + '?? ' + (where[x].Operator || "=") + ' ?';
                if (where.length > 1 && x < where.length - 1) {
                    sql += " and ";
                }
            }
        }
        if (groupBy != "") {
            sql += " group by " + groupBy.substring(1, groupBy.length - 1);
        }
        if (having != "") {
            sql += " having " + having.substring(1, having.length - 1);
        }
        if (orderBy != "") {
            sql += " order by " + orderBy.substring(1, orderBy.length - 1);
        }
        //console.log(sql);
        //query to database
        this.Connection.query(sql, dbParams, function (err, result) {
            var arrError = [];
            if (err) {
                arrError.push(err.message);
                console.log(err);
            }
            //raise the callback 
            if (callback) {
                //calling a callback function
                if (caller == undefined) {
                    callback(arrError, result);
                    return;
                }
                else {
                    callback.call(caller, arrError, result);
                    return;
                }
            }
        });
        return;
    }
    GetResultByQuery(sql, params, callback, caller) {
        //console.log(sql);
        //query to database
        this.Connection.query(sql, params, function (err, rows) {
            var arrError = [];
            if (err) {
                arrError.push(err.message);
                console.log(err);
            }
            if (callback) {
                //logging error
                //calling a callback function
                if (caller == undefined) {
                    callback(arrError, rows);
                }
                else {
                    callback.call(caller, arrError, rows);
                }
            }
        });
    }
}
module.exports = DAL;
//# sourceMappingURL=dal.js.map