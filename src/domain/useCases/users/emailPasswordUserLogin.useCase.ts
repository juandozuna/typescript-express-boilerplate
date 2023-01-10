import {inject, injectable} from "inversify";
import {UseCaseAsync} from "../base.useCase";
import {UserModel} from "../../../models/user.model";
import TYPES from "../../../inversify/types";
import IUserRepository from "../../interfaces/repositories/users.iRepository";

interface EmailPasswordUserLoginUseCaseParams {
  email: string;
  password: string;
}

@injectable()
export default class EmailPasswordUserLoginUseCase implements UseCaseAsync<EmailPasswordUserLoginUseCaseParams, UserModel> {
  @inject(TYPES.Repos.User) private userRepository: IUserRepository;
  
  execute(params: EmailPasswordUserLoginUseCaseParams): Promise<UserModel> {
    return this.userRepository.getByEmail(params.email);
  }
}
