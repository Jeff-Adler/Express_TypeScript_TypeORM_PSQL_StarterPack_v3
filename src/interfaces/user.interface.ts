import { IEntity } from '@interfaces/entity.interface';

export interface IUser extends IEntity {
  email: string;
  password: string;
}
