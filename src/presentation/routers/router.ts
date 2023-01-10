import express, {Router} from "express";
import {BaseController} from "../controllers/controllers";
import {injectable} from "inversify";
import 'reflect-metadata';
import {Logger} from "../../utils";
import BaseMiddleware from "../middlewares/base.middleware";
import AuthMiddleware from "../middlewares/auth.middleware";
import container from "../../inversify/container";


@injectable()
export abstract class ApiRouter<TController extends BaseController> {
  protected abstract controller: TController;
  protected abstract basePath: string;
  protected abstract router: express.Router;
  protected middlewares: BaseMiddleware[] = [];
  
  protected abstract setupRoutes(): void;
  
  /*
    * This method is used to set up middlewares for the router.
   */
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected setupMiddlewares() {
    this.middlewares.forEach(middleware => {
      this.router.use(middleware.execute);
    });
  }
  
  /*
    * This method is used to set up the router.
   */
  public register(app: Router) {
    this.setupMiddlewares();
    this.setupRoutes();
    
    const routes = [];
    this.router.stack.forEach((middleware) => {
      if (middleware.route) { // routes registered directly on the app
        routes.push(middleware.route);
      }
    });
    Logger.log(`Register: /${this.basePath}`, routes);
    app.use(`/${this.basePath}`, this.router);
  }
}

/*
  * This class will automatically add the auth middleware to all routes.
 */
@injectable()
export abstract class ApiAuthRouter<TController extends BaseController> extends ApiRouter<TController> {
  middlewares = [
    container.get(AuthMiddleware)
  ];
}