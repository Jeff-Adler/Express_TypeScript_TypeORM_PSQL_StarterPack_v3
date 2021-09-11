import { Logger } from '@/utils/logger';
import { UserService } from '@services/user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  private readonly userService: UserService = new UserService();

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.findUsers();
      Logger.info('users');

      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
}
