import {IsNotEmpty, IsString, MinLength} from "class-validator";
import AutoMapper from "ts-automapper";
import {TodoModel} from "../../models/todo.model";

export class CreateTodoRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string;
  
  @IsString()
  description?: string;
}

AutoMapper.create<CreateTodoRequest, TodoModel>("CreateTodoRequest")
  .map(src => src.title, dest => dest.title)
  .map(src => src.description, dest => dest.description)
  .map(() => false, dest => dest.completed);