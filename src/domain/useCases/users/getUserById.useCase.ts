import {UseCaseAsync} from "../base.useCase";
import {UserModel} from "../../../models/user.model";
import {inject, injectable} from "inversify";
import TYPES from "../../../inversify/types";
import IUserRepository from "../../interfaces/repositories/users.iRepository";

@injectable()
export default class GetUserByIdUseCase implements UseCaseAsync<string, UserModel> {
  @inject(TYPES.Repos.User) private userRepository: IUserRepository;
  
  public execute(id: string): Promise<UserModel> {
    return this.userRepository.findById(id);
  }
}