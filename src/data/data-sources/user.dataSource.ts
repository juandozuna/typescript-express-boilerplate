import UserSchemaBuilder, {IUserEntity} from "../schemas/user.schema";
import {inject, injectable} from "inversify";
import {Model} from "mongoose";
import {NotFoundError} from "../../models/error.model";


export interface IUserDataSource {
  signUp(user: IUserEntity): Promise<IUserEntity>;
  
  getByEmail(email: string): Promise<IUserEntity>;
  
  findById(id: string): Promise<IUserEntity>;
}

@injectable()
export default class UserDataSource implements IUserDataSource {
  private model: Model<IUserEntity>;
  
  constructor(
    @inject(UserSchemaBuilder) userSchemaBuilder: UserSchemaBuilder
  ) {
    this.model = userSchemaBuilder.buildMongoModel();
  }
  
  async signUp(user: IUserEntity): Promise<IUserEntity> {
    const created = await this.model.create(user);
    return created.toObject();
  }
  
  async getByEmail(email: string): Promise<IUserEntity> {
    const res = await this.model.findOne({email: email}).exec();
    
    if (res) {
      return res.toObject();
    }
    
    throw new NotFoundError(`User with email ${email} not found`);
  }
  
  async findById(id: string): Promise<IUserEntity> {
    const res = await this.model.findById(id).exec();
    
    if (res) {
      return res.toObject();
    }
    
    throw new NotFoundError(`User doesn't exist`);
  }
}