import { Router, Request, Response } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { UserController } from '@controllers/user.controller';

export class UserRoutes implements Routes {
  readonly path: string = '/';
  readonly router: Router = Router();
  readonly UserController: UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.UserController.getUsers);
  }
}
