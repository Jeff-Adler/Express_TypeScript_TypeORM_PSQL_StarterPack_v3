import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { UserController } from '@controllers/user.controller';
import { check } from 'express-validator';
import { validationMiddleware } from '@middlewares/validationMiddleware';
import { FindUserByEmailDto } from '@dtos/findUserByEmail.dto';
import { normalizeEmailMiddleware } from '@middlewares/normalizeEmailMiddleware';
import { CreateUserDto } from '@dtos/createUser.dto';

export class UserRoutes implements Routes {
  readonly path: string = '/';
  readonly router: Router = Router();
  readonly userController: UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.userController.getUsers);

    this.router.get(`${this.path}:id([0-9]+)`, this.userController.getUserById);

    this.router.get(
      `${this.path}search`,
      [validationMiddleware(FindUserByEmailDto, 'query'), normalizeEmailMiddleware('query')],
      this.userController.getUserByEmail
    );

    this.router.post(
      `${this.path}`,
      [validationMiddleware(CreateUserDto, 'body'), normalizeEmailMiddleware('body')],
      this.userController.createUser
    );

    this.router.patch(`${this.path}:id([0-9]+)`, this.userController.updateUser);

    this.router.delete(`${this.path}:id([0-9]+)`, this.userController.deleteUser);
  }
}
