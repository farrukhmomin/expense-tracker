"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PResult = exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["Failed"] = 0] = "Failed";
    Status[Status["Success"] = 1] = "Success";
})(Status = exports.Status || (exports.Status = {}));
class PResult {
    constructor(status, error, param) {
        this.Status = status;
        this.Params = param;
        this.Error = error;
    }
}
exports.PResult = PResult;
//# sourceMappingURL=enums.js.map