"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.AppErrorCode = void 0;
var AppErrorCode;
(function (AppErrorCode) {
    AppErrorCode[AppErrorCode["BadRequest"] = 400] = "BadRequest";
    AppErrorCode[AppErrorCode["Unauthorized"] = 401] = "Unauthorized";
    AppErrorCode[AppErrorCode["Forbidden"] = 403] = "Forbidden";
    AppErrorCode[AppErrorCode["NotFound"] = 404] = "NotFound";
    AppErrorCode[AppErrorCode["NotAcceptable"] = 406] = "NotAcceptable";
    AppErrorCode[AppErrorCode["InternalServerError"] = 500] = "InternalServerError";
})(AppErrorCode = exports.AppErrorCode || (exports.AppErrorCode = {}));
class AppError {
    constructor(message, statusCode = AppErrorCode.InternalServerError) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=error.js.map