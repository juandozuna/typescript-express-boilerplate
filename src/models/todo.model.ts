import BaseModel from "./model";

export interface TodoModel extends BaseModel {
  title: string;
  description: string;
  completed: boolean;
}