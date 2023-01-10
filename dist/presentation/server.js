"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const container_1 = __importDefault(require("../inversify/container"));
const types_1 = __importDefault(require("../inversify/types"));
const utils_1 = require("../utils");
const errorHanlder_middleware_1 = __importDefault(require("./middlewares/errorHanlder.middleware"));
class AppServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3000;
        this.securePort = process.env.HTTPS_PORT ? parseInt(process.env.HTTPS_PORT) : 3001;
    }
    /**
     * Starts the server.
     */
    start() {
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandling();
        this.startHttp();
        this.startHttps();
    }
    setupMiddlewares() {
        // Parse URL-encoded bodies
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Parse JSON requests
        this.app.use(express_1.default.json());
        // Security
        this.app.use((0, helmet_1.default)());
        // Compress all responses
        this.app.use((0, compression_1.default)());
        // Logging
        this.app.use((0, morgan_1.default)('tiny'));
        // Serve static files
        this.app.use(express_1.default.static('public'));
        this.setupSwagger();
    }
    setupSwagger() {
        this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
            swaggerOptions: {
                url: '/swagger.json',
            }
        }));
    }
    setupRoutes() {
        const apiRouter = express_1.default.Router();
        const apiRoutes = container_1.default.getAll(types_1.default.Router);
        apiRoutes.forEach(router => router.register(apiRouter));
        this.app.use('/api', apiRouter);
    }
    setupErrorHandling() {
        this.app.use(errorHanlder_middleware_1.default);
    }
    startHttps() {
        const options = {
            key: fs_1.default.readFileSync('./config/cert.key'),
            cert: fs_1.default.readFileSync('./config/cert.crt'),
        };
        https_1.default.createServer(options, this.app).listen(this.securePort, () => {
            utils_1.Logger.log(`HTTPS started on port ${this.securePort}`);
        });
    }
    startHttp() {
        this.app.listen(this.port, () => {
            utils_1.Logger.log(`Server is listening on port ${this.port}`);
        });
    }
}
exports.default = AppServer;
//# sourceMappingURL=server.js.map