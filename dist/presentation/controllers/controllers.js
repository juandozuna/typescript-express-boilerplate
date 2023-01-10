"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const tsoa_1 = require("tsoa");
let BaseController = class BaseController {
};
BaseController = __decorate([
    (0, inversify_1.injectable)(),
    (0, tsoa_1.Route)('base'),
    (0, tsoa_1.Tags)('Base')
], BaseController);
exports.BaseController = BaseController;
//# sourceMappingURL=controllers.js.map