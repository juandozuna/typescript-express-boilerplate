import * as argon from "argon2";
import {BaseController} from "./controllers";
import {inject, injectable} from "inversify";
import {Body, Get, Path, Post, Response, Route, Tags} from "tsoa";
import AppError, {InvalidError} from "../../models/error.model";
import {UserModel} from "../../models/user.model";
import {SimpleUserResponse, TokenResponse, UserSignInRequest, UserSignUpRequest} from "../viewModels/user.viewModel";
import UserSignUpUseCase from "../../domain/useCases/users/userSignUp.useCase";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import AutoMapper from "ts-automapper";
import GetUserByEmailUseCase from "../../domain/useCases/users/getUserByEmail.useCase";
import EmailPasswordUserLoginUseCase from "../../domain/useCases/users/emailPasswordUserLogin.useCase";
import TYPES from "../../inversify/types";
import {ITokenService} from "../../domain/interfaces/services/token.iService";
import CONFIG from "../../config/CONFIG";

@injectable()
@Route('api/user')
@Tags('User')
@Response<AppError>('400', 'Any Error thrown by app')
export default class UserController extends BaseController {
  @inject(UserSignUpUseCase) private userSignUpUseCase: UserSignUpUseCase;
  @inject(GetUserByEmailUseCase) private getUserByEmailUseCase: GetUserByEmailUseCase;
  @inject(EmailPasswordUserLoginUseCase) private emailPasswordUserLoginUseCase: EmailPasswordUserLoginUseCase;
  @inject(TYPES.Services.Token) private tokenService: ITokenService;
  
  static readonly basePath = 'user';
  
  @Post('signUp')
  public async signUp(@Body() body: UserSignUpRequest): Promise<SimpleUserResponse> {
    const obj = plainToInstance(UserSignUpRequest, body);
    const validationResult = await validate(obj);
    if (validationResult.length > 0) {
      throw new InvalidError(validationResult[0].toString());
    }
    
    const password = await argon.hash(obj.password);
    const model: UserModel = {
      ...body,
      password
    };
    
    const created = await this.userSignUpUseCase.execute(model);
    
    return AutoMapper.exec("SimpleUserResponse", created);
  }
  
  //TODO: return accurate user token
  @Post('signIn')
  public async signIn(@Body() body: UserSignInRequest): Promise<TokenResponse> {
    const obj = plainToInstance(UserSignInRequest, body);
    const validationResult = await validate(obj);
    if (validationResult.length > 0) {
      throw new InvalidError(validationResult[0].toString());
    }
    
    const user = await this.getUserByEmailUseCase.execute(obj.email);
    const userPassword = user.password;
    const isPasswordValid = await argon.verify(userPassword, obj.password);
    
    if (!isPasswordValid) {
      throw new InvalidError('Password is not valid');
    }
    
    const accessToken = await this.tokenService.signToken({
        sub: user.id,
      },
      CONFIG.accessTokenExpiresIn);
    
    return {
      accessToken,
      refreshToken: accessToken,
      user: AutoMapper.exec("SimpleUserResponse", user)
    };
  }
  
  @Get('getUserByEmail/{email}')
  public async getUserByEmail(
    @Path() email: string
  ): Promise<UserModel> {
    return this.getUserByEmailUseCase.execute(email);
  }
}