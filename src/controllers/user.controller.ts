import { User } from '@entity/user.entity';
import { Logger } from '@/utils/logger';
import { UserService } from '@services/user.service';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { validationResult } from 'express-validator';

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
    const { id } = req.params;
    try {
      const user: User = await this.userService.findUserById(parseInt(id));

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.query;
    try {
      const [user] = await this.userService.findUserByEmail(`${email}`);

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await this.userService.createUser(email, password);

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const [...attrs] = req.body;
    try {
      const user = await this.userService.updateUser(parseInt(id), attrs);

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {};
}
