import SchemaBuilder, {IEntityBase} from "./schema";
import {model, Model, Schema} from "mongoose";
import {injectable} from "inversify";
import {UserModel} from "../../models/user.model";

export interface IUserEntity extends IEntityBase {
  name: string;
  lastName: string;
  email: string;
  password?: string;
}

const userSchema = new Schema<IUserEntity>({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
    match: /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
});

@injectable()
export default class UserSchemaBuilder extends SchemaBuilder<IUserEntity, UserModel> {
  buildMongoModel(): Model<IUserEntity> {
    return model<IUserEntity>("User", userSchema);
  }
}