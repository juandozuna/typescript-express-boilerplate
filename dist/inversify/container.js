"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerModule = void 0;
const inversify_1 = require("inversify");
const ping_controller_1 = __importDefault(require("../presentation/controllers/ping.controller"));
const ping_router_1 = __importDefault(require("../presentation/routers/ping.router"));
const types_1 = __importDefault(require("./types"));
const container = new inversify_1.Container();
class ContainerModule {
    static bindAll() {
        this.bindControllers();
        this.bindRouters();
    }
    static bindControllers() {
        container.bind(types_1.default.Controller).to(ping_controller_1.default).inSingletonScope();
    }
    static bindRouters() {
        container.bind(types_1.default.Router).to(ping_router_1.default).inSingletonScope();
    }
}
exports.ContainerModule = ContainerModule;
exports.default = container;
//# sourceMappingURL=container.js.map