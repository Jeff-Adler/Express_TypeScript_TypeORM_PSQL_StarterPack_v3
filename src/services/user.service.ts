import { User } from '@entity/user.entity';
import { EntityTarget, getConnection, getRepository, Repository } from 'typeorm';

export class UserService {
  private readonly userEntity: EntityTarget<User> = User;

  /**
   add query params
   */
  async findUsers() {
    const userRepository: Repository<User> = getRepository(this.userEntity);
    const users: User[] = await userRepository.find();

    return users;
  }

  findUserById() {}

  findUserByEmail() {}

  createUser() {}

  updateUser() {}

  deleteUser() {}
}
