import ITodoRepository from "../../domain/interfaces/repositories/todos.iRepository";
import {TodoModel} from "../../models/todo.model";
import {inject, injectable} from "inversify";
import TYPES from "../../inversify/types";
import {ITodoDataSource} from "../data-sources/todo.dataSource";
import TodoSchemaBuilder from "../schemas/todo.schema";

@injectable()
export default class TodosRepository implements ITodoRepository {
  @inject(TYPES.DataSource.Todo) private todoDataSource: ITodoDataSource;
  @inject(TodoSchemaBuilder) private todoSchemaBuilder: TodoSchemaBuilder;
  
  async create(todo: TodoModel): Promise<TodoModel> {
    const entity = this.todoSchemaBuilder.mapToEntity(todo);
    const res = await this.todoDataSource.create(entity);
    return this.todoSchemaBuilder.mapToModel(res);
  }
  
  async getAll(): Promise<TodoModel[]> {
    const res = await this.todoDataSource.getAll();
    return this.todoSchemaBuilder.mapEntitiesToModels(res);
  }
  
  async getById(id: string): Promise<TodoModel> {
    const res = await this.todoDataSource.getById(id);
    return this.todoSchemaBuilder.mapToModel(res);
  }
  
  async toggleCompleted(id: string): Promise<TodoModel> {
    const res = await this.todoDataSource.toggleCompleted(id);
    return this.todoSchemaBuilder.mapToModel(res);
  }
  
}