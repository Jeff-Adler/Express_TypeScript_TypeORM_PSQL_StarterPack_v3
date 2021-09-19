import { User } from '@entity/user.entity';
import { UserService } from '@services/user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  public userService: UserService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query);

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
    try {
      const user = await this.userService.updateUser(parseInt(id), req.body);

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const user: User = await this.userService.deleteUser(parseInt(id));

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };
}
