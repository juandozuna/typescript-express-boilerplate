import {UseCaseAsync} from "../base.useCase";
import {UserModel} from "../../../models/user.model";
import {inject, injectable} from "inversify";
import TYPES from "../../../inversify/types";
import IUserRepository from "../../interfaces/repositories/users.iRepository";

@injectable()
export default class UserSignUpUseCase implements UseCaseAsync<UserModel, UserModel> {
  @inject(TYPES.Repos.User) private userRepository: IUserRepository;
  
  execute(params: UserModel): Promise<UserModel> {
    return this.userRepository.signUp(params);
  }
}