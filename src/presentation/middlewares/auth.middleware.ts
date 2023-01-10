import BaseMiddleware from "./base.middleware";
import {injectable} from "inversify";
import AppError from "../../models/error.model";
import TYPES from "../../inversify/types";
import {ITokenService} from "../../domain/interfaces/services/token.iService";
import GetUserByIdUseCase from "../../domain/useCases/users/getUserById.useCase";
import {StatusCodes} from "../../config/StatusCodes";
import container from "../../inversify/container";

@injectable()
export default class AuthMiddleware extends BaseMiddleware {
  public async execute(req, res, next) {
    let accessToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.accessToken) {
      accessToken = req.cookies.accessToken;
    }
    
    if (!accessToken) {
      throw new AppError('Unauthorized', StatusCodes.UNAUTHORIZED);
    }
    
    const decoded = await container.get<ITokenService>(TYPES.Services.Token).verifyToken(accessToken);
    
    if (!decoded) {
      throw new AppError('Invalid access token', StatusCodes.UNAUTHORIZED);
    }
    
    
    const user = await container.get<GetUserByIdUseCase>(GetUserByIdUseCase).execute(decoded.sub);
    if (!user) {
      throw new AppError('User not found', StatusCodes.UNAUTHORIZED);
    }
    
    req.user = user;
    next();
  }
}