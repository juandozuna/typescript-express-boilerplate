import {inject, injectable} from "inversify";
import {ApiRouter} from "./router";
import UserController from "../controllers/user.controller";
import express, {CookieOptions} from "express";

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + 60 * 60 * 1000
  ),
  maxAge: 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};


@injectable()
export default class UserRouter extends ApiRouter<UserController> {
  @inject(UserController) protected controller: UserController;
  public basePath = UserController.basePath;
  public router = express.Router();
  
  protected setupRoutes(): void {
    this.router.post('/signUp', async (req, res) => {
      const response = await this.controller.signUp(req.body);
      res.send(response);
    });
    
    this.router.post('/signIn', async (req, res) => {
      const response = await this.controller.signIn(req.body);
      
      res.cookie('accessToken', response.accessToken, accessTokenCookieOptions);
      res.cookie('refreshToken', response.refreshToken);
      res.send(response);
    });
    
    this.router.get('/getUserByEmail/:email', async (req, res) => {
      const response = await this.controller.getUserByEmail(req.params.email);
      res.send(response);
    });
  }
  
}