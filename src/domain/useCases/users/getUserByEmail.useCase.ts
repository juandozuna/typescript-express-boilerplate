import {inject, injectable} from "inversify";
import {UseCaseAsync} from "../base.useCase";
import {UserModel} from "../../../models/user.model";
import TYPES from "../../../inversify/types";
import IUserRepository from "../../interfaces/repositories/users.iRepository";

@injectable()
export default class GetUserByEmailUseCase implements UseCaseAsync<string, UserModel> {
  @inject(TYPES.Repos.User) private userRepository: IUserRepository;
  
  execute(params: string): Promise<UserModel> {
    return this.userRepository.getByEmail(params);
  }
}