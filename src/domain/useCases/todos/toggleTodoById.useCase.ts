import {UseCaseAsync} from "../base.useCase";
import {inject, injectable} from "inversify";
import {TodoModel} from "../../../models/todo.model";
import TYPES from "../../../inversify/types";
import ITodoRepository from "../../interfaces/repositories/todos.iRepository";

@injectable()
export default class ToggleTodoByIdUseCase implements UseCaseAsync<string, TodoModel> {
  @inject(TYPES.Repos.Todo) private todoRepository: ITodoRepository;
  
  execute(params: string): Promise<TodoModel> {
    return this.todoRepository.toggleCompleted(params);
  }
}