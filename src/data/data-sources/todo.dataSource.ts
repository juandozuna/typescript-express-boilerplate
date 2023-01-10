import {inject, injectable} from "inversify";
import TodoSchemaBuilder, {ITodoEntity} from "../schemas/todo.schema";
import {Model} from "mongoose";
import {NotFoundError} from "../../models/error.model";

export interface ITodoDataSource {
  getAll(): Promise<ITodoEntity[]>;
  
  getById(id: string): Promise<ITodoEntity>;
  
  create(todo: ITodoEntity): Promise<ITodoEntity>;
  
  toggleCompleted(id: string): Promise<ITodoEntity>;
}


@injectable()
export default class TodoDataSource implements ITodoDataSource {
  private model: Model<ITodoEntity>;
  
  constructor(
    @inject(TodoSchemaBuilder) todoSchemaBuilder: TodoSchemaBuilder
  ) {
    this.model = todoSchemaBuilder.buildMongoModel();
  }
  
  async getAll(): Promise<ITodoEntity[]> {
    return this.model.find({}).lean();
  }
  
  async getById(id: string): Promise<ITodoEntity> {
    const res = await this.model.findById(id);
    if (!res) {
      throw new NotFoundError("A todo with the given id was not found");
    }
    return res.toObject();
  }
  
  create(todo: ITodoEntity): Promise<ITodoEntity> {
    return this.model.create(todo);
  }
  
  async toggleCompleted(id: string): Promise<ITodoEntity> {
    const res = await this.model.findById(id);
    if (!res) {
      throw new NotFoundError("A todo with the given id was not found");
    }
    res.completed = !res.completed;
    await res.save();
    return res.toObject();
  }
}