"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../domain/entities/error");
const error_model_1 = require("../models/error.model");
const utils_1 = require("../../utils");
function GlobalErrorHandler(err, req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        utils_1.Logger.log(err);
    }
    if (err instanceof error_1.AppError) {
        const errModel = (0, error_model_1.appErrorMapper)(err);
        res.status(err.statusCode).json(errModel);
    }
    else {
        if (process.env.NODE_ENV === 'development') {
            res.status(500).json({ message: err, statusCode: 500 });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error', statusCode: 500 });
        }
    }
    next();
}
exports.default = GlobalErrorHandler;
//# sourceMappingURL=errorHanlder.middleware.js.map