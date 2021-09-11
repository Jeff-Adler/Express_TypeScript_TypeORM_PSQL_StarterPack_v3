import { User } from '@entity/user.entity';
import { Logger } from '@utils/logger';
import { EntityTarget, getConnection, getRepository, Repository } from 'typeorm';

export class UserService {
  private readonly userEntity: EntityTarget<User> = User;

  /**
   add query params
   */
  public findUsers = async () => {
    const userRepository: Repository<User> = getConnection(process.env.DB_CONNECTION_TYPE).getRepository(
      this.userEntity
    );
    const users: User[] = await userRepository.find();

    return users;
  };

  findUserById() {}

  findUserByEmail() {}

  createUser() {}

  updateUser() {}

  deleteUser() {}
}
