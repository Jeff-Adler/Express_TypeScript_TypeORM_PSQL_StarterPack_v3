import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/createUser.dto';
import { Routes } from '@interfaces/routes.interface';
import { validationMiddleware } from '@middlewares/validationMiddleware';
import { Router } from 'express';

export class AuthRoutes implements Routes {
  readonly path: string = '/';
  readonly router: Router = Router();
  readonly authController: AuthController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}register`,
      [validationMiddleware(CreateUserDto, 'body')],
      this.authController.register
    );
    this.router.post(`${this.path}login`, this.authController.login);
  }
}
