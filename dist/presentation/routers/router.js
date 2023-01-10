"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const utils_1 = require("../../utils");
let ApiRouter = class ApiRouter {
    /*
      * This method is used to set up middlewares for the router.
     */
    setupMiddlewares() { }
    /*
      * This method is used to set up the router.
     */
    register(app) {
        this.setupRoutes();
        this.setupMiddlewares();
        let route, routes = [];
        this.router.stack.forEach(function (middleware) {
            if (middleware.route) { // routes registered directly on the app
                routes.push(middleware.route);
            }
        });
        utils_1.Logger.log(`Register: /${this.basePath}`, routes);
        app.use(`/${this.basePath}`, this.router);
    }
};
ApiRouter = __decorate([
    (0, inversify_1.injectable)()
], ApiRouter);
exports.ApiRouter = ApiRouter;
//# sourceMappingURL=router.js.map