import express from 'express';
import PingController from '../controllers/ping.controller';
import {ApiRouter} from "./router";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {StatusCodes} from "../../config/StatusCodes";

@injectable()
export default class PingRouter extends ApiRouter<PingController> {
  @inject(PingController) protected controller: PingController;
  public basePath = PingController.basePath;
  public router = express.Router();
  
  public setupRoutes() {
    this.router.get('/', async (req, res) => {
      const response = await this.controller.getMessage();
      res.send(response);
    });
    
    this.router.get('/error', (req, res) => {
      this.controller.getError();
      res.sendStatus(StatusCodes.OK);
    });
  }
}

