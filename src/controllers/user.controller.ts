import { User } from '@entity/user.entity';
import { Logger } from '@/utils/logger';
import { UserService } from '@services/user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  public userService: UserService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: User[] = await this.userService.findUsers();

      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    try {
      const user: User = await this.userService.findUserById(parseInt(id));

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {};

  public createUser = async (req: Request, res: Response, next: NextFunction) => {};

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {};

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {};
}
