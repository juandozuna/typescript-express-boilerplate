import {TodoModel} from "../../../models/todo.model";

export default interface ITodoRepository {
  getAll(): Promise<TodoModel[]>;
  
  getById(id: string): Promise<TodoModel>;
  
  create(todo: TodoModel): Promise<TodoModel>;
  
  toggleCompleted(id: string): Promise<TodoModel>;
}