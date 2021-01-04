"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformObjectToArray = void 0;
function transformObjectToArray(obj) {
    const result = [{ column: [], data: [] }];
    if (obj.length > 0) {
        // keys
        Object.keys(obj[0]).map(key => result[0].column.push(key));
        // data
        obj.forEach((data, index) => {
            var dataObj = [];
            Object.keys(data).map(keys => {
                dataObj.push(data[keys]);
            });
            result[result.length - 1].data.push(dataObj);
        });
    }
    return result;
}
exports.transformObjectToArray = transformObjectToArray;
//# sourceMappingURL=functions.js.map