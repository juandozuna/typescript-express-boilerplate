import {UserModel} from "../../../models/user.model";


export default interface IUserRepository {
  signUp(user: UserModel): Promise<UserModel>;
  
  emailPasswordLogin(email: string, password: string): Promise<UserModel>;
  
  getByEmail(email: string): Promise<UserModel>;
  
  findById(id: string): Promise<UserModel>;
}