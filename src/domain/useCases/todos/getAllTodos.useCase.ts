import {inject, injectable} from "inversify";
import {NoParams, UseCaseAsync} from "../base.useCase";
import {TodoModel} from "../../../models/todo.model";
import ITodoRepository from "../../interfaces/repositories/todos.iRepository";
import TYPES from "../../../inversify/types";


@injectable()
export default class GetAllTodosUseCase implements UseCaseAsync<NoParams, TodoModel[]> {
  @inject(TYPES.Repos.Todo) private todoRepository: ITodoRepository;
  
  execute(params: NoParams): Promise<TodoModel[]> {
    return this.todoRepository.getAll();
  }
}