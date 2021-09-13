import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class findUserByEmailDto {
  @Expose()
  @IsEmail()
  email!: string;
}
