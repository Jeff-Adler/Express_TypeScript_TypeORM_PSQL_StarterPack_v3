import { User } from '@entity/user.entity';
import { UserService } from '@services/user.service';
import { NextFunction, Request, Response } from 'express';
import { FindManyOptions, OrderByCondition } from 'typeorm';
import { IUser } from '@interfaces/user.interface';

export class UserController {
  public userService: UserService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let findOptions: FindManyOptions<User> = <FindManyOptions<User>>{};

      console.log(findOptions);

      if (req.query.take && parseInt(`${req.query.take}`)) {
        findOptions['take'] = parseInt(`${req.query.take}`);
      }

      if (req.query.skip && parseInt(`${req.query.skip}`)) {
        findOptions['skip'] = parseInt(`${req.query.skip}`);
      }

      if (req.query.order) {
        let columnName: string = '';
        let ordering: string = '';
        const parts: string[] = (<string>req.query.order)?.split(':');
        if (parts && parts.length >= 2) {
          [columnName, ordering] = parts;
        }
        if (columnName && ordering && isValidOrderByCondition({ [columnName]: ordering.toUpperCase() })) {
          findOptions['order'] = <OrderByCondition>{ [columnName]: ordering.toUpperCase() };
        }
      }

      // if (req.query.order && isOrderByCondition(req.query.order)) {
      //   findOptions['order'] = req.query.order;
      // }

      // if (isFindManyOption(req.query)) {
      //   findOptions = <FindManyOptions>req.query;
      // }

      const users: User[] = await this.userService.findUsers(findOptions);

      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }

    // function isFindManyOption(queryParam: any): queryParam is FindManyOptions<User> {
    //   return <FindManyOptions>queryParam !== undefined;
    // }

    // function isOrderByCondition(queryParam: any): queryParam is OrderByCondition {
    //   return <OrderByCondition>queryParam !== undefined;
    // }

    function isValidOrderByCondition(parts: { [columnName: string]: string }): boolean {
      return <OrderByCondition>parts !== undefined;
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
