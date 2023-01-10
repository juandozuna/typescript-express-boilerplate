// noinspection ChainedFunctionCallJS

import {Container} from "inversify";
import PingController from "../presentation/controllers/ping.controller";
import PingRouter from "../presentation/routers/ping.router";
import TYPES from "./types";
import TodoController from "../presentation/controllers/todo.controller";
import TodoRouter from "../presentation/routers/todo.router";
import {ApiRouter} from "../presentation/routers/router";
import GetAllTodosUseCase from "../domain/useCases/todos/getAllTodos.useCase";
import ITodoRepository from "../domain/interfaces/repositories/todos.iRepository";
import TodosRepository from "../data/repositories/todos.repository";
import TodoDataSource, {ITodoDataSource} from "../data/data-sources/todo.dataSource";
import TodoSchemaBuilder from "../data/schemas/todo.schema";
import UserSchemaBuilder from "../data/schemas/user.schema";
import IUserRepository from "../domain/interfaces/repositories/users.iRepository";
import {UsersRepository} from "../data/repositories/users.repository";
import UserDataSource, {IUserDataSource} from "../data/data-sources/user.dataSource";
import UserController from "../presentation/controllers/user.controller";
import GetUserByEmailUseCase from "../domain/useCases/users/getUserByEmail.useCase";
import UserSignUpUseCase from "../domain/useCases/users/userSignUp.useCase";
import UserRouter from "../presentation/routers/user.router";
import {IPasswordHasherService} from "../domain/interfaces/services/passwordHasher.iService";
import {PasswordHasherService} from "../data/services/passwordHasher.service";
import {ITokenService} from "../domain/interfaces/services/token.iService";
import {TokenService} from "../data/services/token.service";
import EmailPasswordUserLoginUseCase from "../domain/useCases/users/emailPasswordUserLogin.useCase";
import {GetTodoByIdUseCase} from "../domain/useCases/todos/getTodoById.useCase";
import {CreateTodoUseCase} from "../domain/useCases/todos/createTodo.useCase";
import ToggleTodoByIdUseCase from "../domain/useCases/todos/toggleTodoById.useCase";
import AuthMiddleware from "../presentation/middlewares/auth.middleware";
import GetUserByIdUseCase from "../domain/useCases/users/getUserById.useCase";

const container = new Container({defaultScope: "Singleton"});

const Services = () => {
  container.bind<IPasswordHasherService>(TYPES.Services.PasswordHasher).to(PasswordHasherService);
  container.bind<ITokenService>(TYPES.Services.Token).to(TokenService).inTransientScope();
};

const UsersModule = () => {
  container.bind<UserSchemaBuilder>(UserSchemaBuilder).toSelf();
  container.bind<IUserDataSource>(TYPES.DataSource.User).to(UserDataSource);
  container.bind<IUserRepository>(TYPES.Repos.User).to(UsersRepository);
  
  container.bind<UserSignUpUseCase>(UserSignUpUseCase).toSelf();
  container.bind<GetUserByEmailUseCase>(GetUserByEmailUseCase).toSelf();
  container.bind<EmailPasswordUserLoginUseCase>(EmailPasswordUserLoginUseCase).toSelf();
  container.bind<GetUserByIdUseCase>(GetUserByIdUseCase).toSelf();
  
  container.bind<UserController>(UserController).toSelf();
  container.bind<ApiRouter<any>>(TYPES.Router).to(UserRouter);
};

const TodosModule = () => {
  container.bind<TodoSchemaBuilder>(TodoSchemaBuilder).toSelf();
  container.bind<ITodoDataSource>(TYPES.DataSource.Todo).to(TodoDataSource);
  container.bind<ITodoRepository>(TYPES.Repos.Todo).to(TodosRepository);
  
  container.bind<GetAllTodosUseCase>(GetAllTodosUseCase).toSelf();
  container.bind<GetTodoByIdUseCase>(GetTodoByIdUseCase).toSelf();
  container.bind<CreateTodoUseCase>(CreateTodoUseCase).toSelf();
  container.bind<ToggleTodoByIdUseCase>(ToggleTodoByIdUseCase).toSelf();
  
  container.bind<TodoController>(TodoController).toSelf();
  container.bind<ApiRouter<any>>(TYPES.Router).to(TodoRouter);
};

const PingModule = () => {
  container.bind<PingController>(PingController).toSelf();
  container.bind<ApiRouter<any>>(TYPES.Router).to(PingRouter);
};

const Middlewares = () => {
  container.bind<AuthMiddleware>(AuthMiddleware).toSelf().inTransientScope();
};

/**
 * This module, should be the only place holding some sort of coupling within the app
 */
export class ContainerModule {
  public static bindAll(): void {
    Services();
    UsersModule();
    TodosModule();
    PingModule();
    Middlewares();
  }
}

export default container;