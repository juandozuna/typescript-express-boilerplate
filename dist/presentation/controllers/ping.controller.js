"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const controllers_1 = require("./controllers");
const inversify_1 = require("inversify");
require("reflect-metadata");
const error_1 = require("../../domain/entities/error");
let PingController = class PingController extends controllers_1.BaseController {
    getMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            return { message: 'pong' };
        });
    }
    getError() {
        throw new error_1.AppError('This is me trying to test a simple error', error_1.AppErrorCode.BadRequest);
    }
};
PingController.basePath = 'ping';
__decorate([
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PingController.prototype, "getMessage", null);
__decorate([
    (0, tsoa_1.Get)('/error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PingController.prototype, "getError", null);
PingController = __decorate([
    (0, inversify_1.injectable)(),
    (0, tsoa_1.Route)('api/ping'),
    (0, tsoa_1.Tags)('Ping'),
    (0, tsoa_1.Response)('400', 'Any Error thrown by app')
], PingController);
exports.default = PingController;
//# sourceMappingURL=ping.controller.js.map