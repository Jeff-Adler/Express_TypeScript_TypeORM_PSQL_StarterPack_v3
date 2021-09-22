import { HttpException } from '@exceptions/HttpException';
import { UserService } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '@entity/user.entity';

export class AuthController {
  public userService: UserService = new UserService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const user: User = await this.authService.register(email, password);

      return res.status(200).send(user);
    } catch (error) {
      // try {
      //   await this.userService.findUserByEmail(email);
      // }
      // // if ((await this.userService.findUserByEmail(email)) instanceof Error) {
      // //   throw new HttpException(404, `User with email ${email} already exists!`);
      // // }

      // try {
      //   const hashedPassword = await bcrypt.hash(password, 10);
      //   const user = await this.userService.createUser(email, hashedPassword);
      next(error);
    }
  };

  public login(req: Request, res: Response, next: NextFunction) {}
}
