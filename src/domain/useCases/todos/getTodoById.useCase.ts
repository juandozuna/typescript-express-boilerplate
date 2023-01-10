import {UseCaseAsync} from "../base.useCase";
import {TodoModel} from "../../../models/todo.model";
import {inject, injectable} from "inversify";
import TYPES from "../../../inversify/types";
import ITodoRepository from "../../interfaces/repositories/todos.iRepository";

@injectable()
export class GetTodoByIdUseCase implements UseCaseAsync<string, TodoModel> {
  @inject(TYPES.Repos.Todo) private todoRepository: ITodoRepository;
  
  execute(id: string): Promise<TodoModel> {
    return this.todoRepository.getById(id);
  }
}