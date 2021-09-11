import { UserService } from '@services/user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  private readonly userService: UserService = new UserService();

  getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = this.userService.findUsers();

      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
}
