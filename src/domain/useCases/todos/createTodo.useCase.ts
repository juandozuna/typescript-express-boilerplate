import {inject, injectable} from "inversify";
import {UseCaseAsync} from "../base.useCase";
import {TodoModel} from "../../../models/todo.model";
import TYPES from "../../../inversify/types";
import ITodoRepository from "../../interfaces/repositories/todos.iRepository";


@injectable()
export class CreateTodoUseCase implements UseCaseAsync<TodoModel, TodoModel> {
  @inject(TYPES.Repos.Todo) private todoRepository: ITodoRepository;
  
  execute(todo: TodoModel): Promise<TodoModel> {
    return this.todoRepository.create(todo);
  }
  
}