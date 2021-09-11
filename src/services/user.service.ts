import { User } from '@entity/user.entity';
import { EntityTarget, getRepository, Repository } from 'typeorm';

export class UserService {
  private readonly userEntity: EntityTarget<User> = User;
  private readonly userRepository: Repository<User> = getRepository(this.userEntity);

  /**
   add query params
   */
  async findUsers() {
    const users: User[] = await this.userRepository.find();

    return users;
  }

  findUserById() {}

  findUserByEmail() {}

  createUser() {}

  updateUser() {}

  deleteUser() {}
}
