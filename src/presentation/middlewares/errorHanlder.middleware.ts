// noinspection ChainedFunctionCallJS

import {NextFunction, Request, Response} from "express";
import AppError from "../../models/error.model";
import {Logger} from "../../utils";
import CONFIG from "../../config/CONFIG";
import {StatusCodes} from "../../config/StatusCodes";


export default function GlobalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (CONFIG.isDev) {
    Logger.log(err);
  }
  
  if (err instanceof AppError) {
    res.status(err.statusCode).json(err);
  } else {
    if (CONFIG.isDev) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: JSON.stringify(err), statusCode: 500});
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error', statusCode: 500});
    }
  }
  
  next(err);
}