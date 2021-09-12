import { User } from '@entity/user.entity';
import { HttpException } from '@exceptions/HttpException';
import { Logger } from '@utils/logger';
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

  createUser = async () => {};

  updateUser = async () => {};

  deleteUser = async () => {};
}
