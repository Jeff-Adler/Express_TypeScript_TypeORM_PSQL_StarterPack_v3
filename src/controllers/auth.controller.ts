import { Request, Response, NextFunction } from 'express';
import { User } from '@entity/user.entity';
import { CreateUserDto } from '@dtos/createUser.dto';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public authService: AuthService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const user: User = await this.authService.register(userData);

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public login(req: Request, res: Response, next: NextFunction) {}
}
