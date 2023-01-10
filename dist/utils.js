"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static log(message, ...optionalParams) {
        if (process.env.LOG_ACTIVE === 'true') {
            console.log(message, ...optionalParams);
        }
    }
    static clear() {
        console.clear();
    }
}
exports.Logger = Logger;
//# sourceMappingURL=utils.js.map