import {NextFunction, Request, Response} from "express";
import {injectable} from "inversify";

@injectable()
export default abstract class BaseMiddleware {
  public abstract execute(req: Request, res: Response, next: NextFunction): void | Promise<void>;
}