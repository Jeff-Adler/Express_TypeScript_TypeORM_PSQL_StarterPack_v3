import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@dtos/createUser.dto';
import { User } from '@entity/user.entity';
import { HttpException } from '@exceptions/HttpException';
import { EntityTarget, getRepository } from 'typeorm';
import { UserService } from './user.service';

export class AuthService {
  private readonly userService: UserService = new UserService();
  private readonly userEntity: EntityTarget<User> = User;

  public async register(userData: CreateUserDto): Promise<User> {
    const userRepository = getRepository(this.userEntity);
    const { email, password } = userData;

    if (await userRepository.findOne({ email })) {
      throw new HttpException(404, `User with email ${email} already exists!`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser(email, hashedPassword);

    if (!user) {
      throw new HttpException(404, `Error occured when registering user`);
    }

    return user;
  }

  public async login(userData: CreateUserDto): Promise<User> {
    const userRepository = getRepository(this.userEntity);
    const { email, password } = userData;

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new HttpException(404, `User of email ${email} not found`);
    }

    console.log(user.password);

    const isPasswordMatching: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new HttpException(404, 'Invalid password');
    }

    return user;
  }
}
