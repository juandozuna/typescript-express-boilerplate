import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import AutoMapper from "ts-automapper";
import {UserModel} from "../../models/user.model";

export class UserSignInRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;
}

export class UserSignUpRequest {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  lastName: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;
}

export interface SimpleUserResponse {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

AutoMapper.create<UserModel, SimpleUserResponse>("SimpleUserResponse")
  .map(src => src.id, dest => dest.id)
  .map(src => src.name, dest => dest.name)
  .map(src => src.lastName, dest => dest.lastName)
  .map(src => src.email, dest => dest.email);


export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user: SimpleUserResponse;
}