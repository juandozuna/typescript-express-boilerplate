import {ApiAuthRouter} from "./router";
import TodoController from "../controllers/todo.controller";
import {inject, injectable} from "inversify";
import express from "express";
import 'reflect-metadata';

@injectable()
export default class TodoRouter extends ApiAuthRouter<TodoController> {
  @inject(TodoController) protected controller: TodoController;
  public basePath = TodoController.basePath;
  public router = express.Router();
  
  public setupRoutes() {
    this.router.get('/', async (req, res) => {
      const response = await this.controller.getTodos();
      res.send(response);
    });
    
    this.router.get('/:id', async (req, res) => {
      const response = await this.controller.getTodoById(req.params.id);
      res.send(response);
    });
    
    this.router.post('/', async (req, res) => {
      const response = await this.controller.createTodo(req.body);
      res.send(response);
    });
    
    this.router.put('/:id/toggle', async (req, res) => {
      const response = await this.controller.updateTodoById(req.params.id);
      res.send(response);
    });
    
    
  }
}