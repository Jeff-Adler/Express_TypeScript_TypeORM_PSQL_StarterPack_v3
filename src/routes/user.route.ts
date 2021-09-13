import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { UserController } from '@controllers/user.controller';
import { check, query } from 'express-validator';
import { dtoValidationMiddleware, validationMiddleware } from '@middlewares/validationMiddleware';
import { findUserByEmailDto } from '@dtos/findUserByEmail.dto';

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

    // this.router.get(
    //   `${this.path}search`,
    //   [query('email').exists().isEmail().normalizeEmail(), validationMiddleware, check('email').normalizeEmail()],
    //   this.userController.getUserByEmail
    // );

    this.router.get(
      `${this.path}search`,
      [dtoValidationMiddleware(findUserByEmailDto, 'query'), check('email').normalizeEmail()],
      this.userController.getUserByEmail
    );

    this.router.post(`${this.path}`, this.userController.createUser);

    this.router.patch(`${this.path}:id([0-9]+)`, this.userController.updateUser);

    this.router.delete(`${this.path}:id([0-9]+)`, this.userController.deleteUser);
  }
}
