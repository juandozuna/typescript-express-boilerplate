"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appErrorMapper = void 0;
function appErrorMapper(error) {
    return {
        message: error.message,
        statusCode: error.statusCode
    };
}
exports.appErrorMapper = appErrorMapper;
//# sourceMappingURL=error.model.js.map