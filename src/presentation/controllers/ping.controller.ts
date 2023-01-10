import {Get, Response, Route, Tags} from "tsoa";
import {BaseController} from "./controllers";
import {injectable} from "inversify";
import 'reflect-metadata';
import AppError from "../../models/error.model";
import {StatusCodes} from "../../config/StatusCodes";

interface PingResponse {
  message: string;
}

@injectable()
@Route('api/ping')
@Tags('Ping')
@Response<AppError>('400', 'Any Error thrown by app')
export default class PingController extends BaseController {
  static readonly basePath = 'ping';
  
  @Get('/')
  public async getMessage(): Promise<PingResponse> {
    return {message: 'pong'};
  }
  
  @Get('/error')
  public getError(): void {
    throw new AppError('This is me trying to test a simple error', StatusCodes.NOT_FOUND);
  }
}