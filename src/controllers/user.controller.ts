import { User } from '@entity/user.entity';
import { Logger } from '@/utils/logger';
import { UserService } from '@services/user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  public userService: UserService = new UserService();

  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users: User[] = await this.userService.findUsers();
      Logger.info('users');

      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
}
