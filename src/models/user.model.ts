import BaseModel from "./model";

export interface UserModel extends BaseModel {
  name: string;
  lastName: string;
  email: string;
  password?: string;
}