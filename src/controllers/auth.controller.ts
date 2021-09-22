import { Request, Response, NextFunction } from 'express';
import { User } from '@entity/user.entity';
import { CreateUserDto } from '@dtos/createUser.dto';
import { AuthService } from '@services/auth.service';
import { LoginUserDto } from '@dtos/loginUser.dto';

export class AuthController {
  public authService: AuthService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const createUserData: CreateUserDto = req.body;

    try {
      const user: User = await this.authService.register(createUserData);

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const loginUserData: LoginUserDto = req.body;

    try {
      const user: User = await this.authService.login(loginUserData);

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };
}
