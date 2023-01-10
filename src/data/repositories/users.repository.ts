import {inject, injectable} from "inversify";
import IUserRepository from "../../domain/interfaces/repositories/users.iRepository";
import {UserModel} from "../../models/user.model";
import {IUserDataSource} from "../data-sources/user.dataSource";
import TYPES from "../../inversify/types";
import UserSchemaBuilder, {IUserEntity} from "../schemas/user.schema";
import {IPasswordHasherService} from "../../domain/interfaces/services/passwordHasher.iService";
import {InvalidError} from "../../models/error.model";


@injectable()
export class UsersRepository implements IUserRepository {
  @inject(TYPES.DataSource.User) private userDataSource: IUserDataSource;
  @inject(TYPES.Services.PasswordHasher) private passwordHasher: IPasswordHasherService;
  @inject(UserSchemaBuilder) private userSchemaBuilder: UserSchemaBuilder;
  
  async signUp(user: UserModel): Promise<UserModel> {
    const mappedUser = this.userSchemaBuilder.mapToEntity(user);
    const createdUser = await this.userDataSource.signUp(mappedUser);
    return this.userSchemaBuilder.mapToModel(createdUser);
  }
  
  async getByEmail(email: string): Promise<UserModel> {
    const foundUser = await this.userDataSource.getByEmail(email);
    return this.userSchemaBuilder.mapToModel(foundUser);
  }
  
  async emailPasswordLogin(email: string, password: string): Promise<UserModel> {
    let foundUser: IUserEntity;
    try {
      foundUser = await this.userDataSource.getByEmail(email);
    } catch (e) {
      throw new InvalidError('Invalid email or password');
    }
    
    const isPasswordValid = await this.passwordHasher.compare(foundUser.password, password);
    if (!isPasswordValid) {
      throw new InvalidError('Invalid email or password');
    }
    
    return this.userSchemaBuilder.mapToModel(foundUser);
  }
  
  async findById(id: string): Promise<UserModel> {
    const user = await this.userDataSource.findById(id);
    return this.userSchemaBuilder.mapToModel(user);
  }
  
}