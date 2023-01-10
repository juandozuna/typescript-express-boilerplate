import 'express-async-errors';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from "swagger-ui-express";
import express from 'express';
import https from 'https';
import fs from 'fs';
import morgan from 'morgan';
import {Logger} from "../utils";
import GlobalErrorHandler from "./middlewares/errorHanlder.middleware";
import container from "../inversify/container";
import {ApiRouter} from "./routers/router";
import TYPES from "../inversify/types";
import CONFIG from "../config/CONFIG";
import cookieParser from "cookie-parser";
import cors from "cors";

export default class AppServer {
  private readonly app: express.Application;
  private readonly port: number;
  private readonly securePort: number;
  
  constructor() {
    this.app = express();
    this.port = parseInt(CONFIG.httpPort);
    this.securePort = parseInt(CONFIG.httpsPort);
  }
  
  /**
   * Starts the server.
   */
  public start() {
    this.setupMiddlewares();
    
    this.setupRoutes();
    
    this.setupErrorHandling();
    
    this.startHttp();
    this.startHttps();
  }
  
  /**
   * Sets up app wide middlewares.
   * @private
   */
  private setupMiddlewares() {
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(morgan('tiny'));
    this.app.use(express.static('public'));
    this.app.use(cors({
      origin: CONFIG.corsOrigin,
      credentials: true,
    }));
    
    this.setupSwagger();
  }
  
  private setupSwagger() {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(
      undefined,
      {
        swaggerOptions: {
          url: '/swagger.json',
        }
      })
    );
  }
  
  private setupRoutes() {
    const apiRouter = express.Router();
    
    const routers = container.getAll<ApiRouter<any>>(TYPES.Router);
    
    routers.forEach(router => router.register(apiRouter));
    
    this.app.use('/api', apiRouter);
  }
  
  private setupErrorHandling() {
    this.app.use(GlobalErrorHandler);
  }
  
  private startHttps() {
    const options = {
      key: fs.readFileSync('./config/cert.key'),
      cert: fs.readFileSync('./config/cert.crt'),
    };
    
    https.createServer(options, this.app).listen(this.securePort, () => {
      Logger.log(`HTTPS started on port ${this.securePort}`);
    });
  }
  
  private startHttp() {
    this.app.listen(this.port, () => {
      Logger.log(`Server is listening on port ${this.port}`);
    });
  }
}