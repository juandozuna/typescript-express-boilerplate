import {BaseController} from "./controllers";
import {inject, injectable} from "inversify";
import {Body, Get, Path, Post, Put, Response, Route, Tags,} from "tsoa";
import {TodoModel} from "../../models/todo.model";
import 'reflect-metadata';
import AppError, {InvalidError} from "../../models/error.model";
import GetAllTodosUseCase from "../../domain/useCases/todos/getAllTodos.useCase";
import {GetTodoByIdUseCase} from "../../domain/useCases/todos/getTodoById.useCase";
import {CreateTodoUseCase} from "../../domain/useCases/todos/createTodo.useCase";
import ToggleTodoByIdUseCase from "../../domain/useCases/todos/toggleTodoById.useCase";
import AutoMapper from "ts-automapper";
import {CreateTodoRequest} from "../viewModels/todo.viewModel";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

@injectable()
@Route('api/todo')
@Tags('Todo')
@Response<AppError>('400', 'Any Error thrown by app')
export default class TodoController extends BaseController {
  @inject(GetAllTodosUseCase) private getAllTodosUseCase: GetAllTodosUseCase;
  @inject(GetTodoByIdUseCase) private getTodoByIdUseCase: GetTodoByIdUseCase;
  @inject(CreateTodoUseCase) private createTodoUseCase: CreateTodoUseCase;
  @inject(ToggleTodoByIdUseCase) private toggleTodoByIdUseCase: ToggleTodoByIdUseCase;
  
  static readonly basePath = 'todo';
  
  @Get('/')
  public async getTodos(): Promise<TodoModel[]> {
    return await this.getAllTodosUseCase.execute({});
  }
  
  @Get('/{id}')
  public async getTodoById(@Path() id: string): Promise<TodoModel> {
    return await this.getTodoByIdUseCase.execute(id);
  }
  
  @Post('/')
  public async createTodo(@Body() body: CreateTodoRequest): Promise<TodoModel> {
    const obj = plainToInstance(CreateTodoRequest, body);
    const validationResult = await validate(obj);
    if (validationResult.length > 0) {
      throw new InvalidError(validationResult[0].toString());
    }
    
    const model: TodoModel = AutoMapper.exec("CreateTodoRequest", body);
    return await this.createTodoUseCase.execute(model);
  }
  
  @Put('/{id}/toggle')
  public async updateTodoById(@Path() id: string): Promise<TodoModel> {
    return await this.toggleTodoByIdUseCase.execute(id);
  }
  
}