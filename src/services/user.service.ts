import { User } from '@entity/user.entity';
import { HttpException } from '@exceptions/HttpException';
import { Logger } from '@utils/logger';
import { exception } from 'console';
import { EntityTarget, getConnection, getRepository, Repository } from 'typeorm';

export class UserService {
  private readonly userEntity: EntityTarget<User> = User;

  /**
   add query params
   */
  public findUsers = async (): Promise<User[]> => {
    const userRepository: Repository<User> = getConnection(process.env.DB_CONNECTION_TYPE).getRepository(
      this.userEntity
    );
    const users: User[] = await userRepository.find();

    return users;
  };

  public findUserById = async (id: number): Promise<User> => {
    const userRepository: Repository<User> = getConnection(process.env.DB_CONNECTION_TYPE).getRepository(
      this.userEntity
    );
    const user: User | undefined = await userRepository.findOne(id);

    if (!user) {
      throw new HttpException(404, `User of id ${id} not found`);
    }

    return user;
  };

  findUserByEmail = async (email: string): Promise<User[]> => {
    const userRepository: Repository<User> = getConnection(process.env.DB_CONNECTION_TYPE).getRepository(
      this.userEntity
    );
    const users: User[] = await userRepository.find({ email });

    if (!users.length) {
      throw new HttpException(404, `User of email ${email} not found`);
    }

    return users;
  };

  createUser = async (email: string, password: string) => {
    const userRepository: Repository<User> = getConnection(process.env.DB_CONNECTION_TYPE).getRepository(
      this.userEntity
    );
    let user = userRepository.create({ email, password });

    await userRepository.save(user);

    // Necessary extra step to hide password
    return userRepository.findOne(user.id);
  };

  updateUser = async (id: number, attrs: Partial<User>) => {
    const userRepository: Repository<User> = getConnection(process.env.DB_CONNECTION_TYPE).getRepository(
      this.userEntity
    );
    const user: User | undefined = await userRepository.findOne(id);

    if (!user) {
      throw new HttpException(404, `User of id ${id} not found`);
    }

    // We use this in lieu of .update, because .update doesn't trigger TypeORM entity lifecycle hooks.
    Object.assign(user, attrs);
    console.log(user);

    try {
      await userRepository.save(user);

      return userRepository.findOne(user.id);
    } catch (error) {
      throw new HttpException(404, error);
    }
  };

  deleteUser = async () => {};
}
